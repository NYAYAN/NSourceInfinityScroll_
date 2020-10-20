(function () {
    var pContainerElem = document.querySelector('.product-list');
    var loadPageNumber = pContainerElem.getAttribute('start-page');
    var loadPageCounter = pContainerElem.getAttribute('load-page-counter');
    var htmlElem = document.querySelector('html');

    var getScrollPages = function (f, d = 100) {
        var timeout = null;
        return function (...args) {
            if (timeout) return;
            timeout = setTimeout(() => timeout = null, d);
            f(...args);
        }
    };
    var setGlobal = function (f, d = 10) {
        var timeout = null;
        return function (...args) {
            if (timeout) return;
            timeout = setTimeout(() => timeout = null, d);
            f(...args);
        }
    };

    var getScrollPosition = function () {
        if (window.pageYOffset !== undefined) {
            return [pageXOffset, pageYOffset];
        } else {
            var sx, sy, d = document,
                r = d.documentElement,
                b = d.body;
            sx = r.scrollLeft || b.scrollLeft || 0;
            sy = r.scrollTop || b.scrollTop || 0;
            return [sx, sy];
        }
    }

    var lastScrollTop = 0;
    var scrollWayStr;
    var setScrollPositionWay = function (scrollY) {
        var st = scrollY;
        if (st < lastScrollTop) {
            scrollWayStr = "UP";
        }
        else {
            scrollWayStr = "DOWN";
        }
        lastScrollTop = st;
    }

    var getDocHeight = function () {
        var d = document;
        return Math.max(
            d.body.scrollHeight, d.documentElement.scrollHeight,
            d.body.offsetHeight, d.documentElement.offsetHeight,
            d.body.clientHeight, d.documentElement.clientHeight
        );
    }

    window.addEventListener("scroll", setGlobal(function () {
        var scrollPositionY = getScrollPosition()[1];
        getPageNumber(scrollPositionY);
        setScrollPositionWay(scrollPositionY);
    }));

    window.addEventListener("scroll", getScrollPages(function () {
        var scrollPositionY = getScrollPosition()[1];
        if (lockRequest) {
            return;
        }

        if (scrollWayStr === "UP" && !lockPrePage) {
            if (Math.abs(pContainerElem.getBoundingClientRect().y) >= 0 && Math.abs(pContainerElem.getBoundingClientRect().y) < 271) {
                // console.log('0 ---> call pre page');
                getPageService(scrollWayStr);
            }
        }

        if (scrollWayStr === "DOWN" && !lockNextPage) {
            if (getDocHeight() - ((getDocHeight() - pContainerElem.getBoundingClientRect().height) + 271) <= scrollPositionY + window.innerHeight) {
                // console.log('0 ---> call next page');
                getPageService(scrollWayStr);
            }
        }
    }));


    var getPageNumber = function (scrollY) {
        productList.forEach(function (pContainer, pCIndex) {
            if (pContainer.start <= scrollY && pContainer.end >= scrollY) {
                window.history.replaceState(window.history.state, document.title, '?page=' + pContainer.page);
                currentPage = pContainer.page;
            }
        });
    }

    var lockRequest = false;
    var lockNextPage = false;
    var lockPrePage = false;
    var lockPageLoadScrollPosition = false;
    var getPageService = function (scrollWay, url) {
        var callPageNumber = -1;
        if (scrollWay === "DOWN") {
            callPageNumber = getCalledLastPage();
            if (callPageNumber >= 0) {
                callPageNumber += 1;
            }
        }

        if (scrollWay === "UP") {
            callPageNumber = getCalledFirstPage();
            callPageNumber -= 1;
        }

        if (callPageNumber === -1) {
            return;
        }

        if (ceheckCalledPageIsHave(callPageNumber)) {
            return;
        }

        lockRequest = true;
        // var url = '/page' + callPageNumber + '.html';
        var url = 'https://localhost:44385/home/page?page=' + callPageNumber;
        var jqxhr = $.ajax(url)
            .done(function (res) {
                console.info("success");
                processPagination(res, callPageNumber, scrollWay);
            })
            .fail(function (res) {
                lockRequest = true;
                if (callPageNumber > 0) {
                    lockNextPage = true;
                } if (callPageNumber <= 0) {
                    lockPrePage = true;
                }

                if (!hasScrollBar()) {
                    if (!lockPrePage) {
                        getPageService("UP");
                    }
                }
                console.info("error");
            })
            .always(function (res) {
                console.info("complete");
            });
        jqxhr.always(function () {
            console.info("second complete");
        });
    }

    //Sayfa icerigini alma ve hesaplamalar
    var processPagination = function (response, pageNumber, scrollWay) {
        var productOffsetHeight = document.querySelector('.product').offsetHeight;
        var newContainer = document.createElement("div");
        newContainer.insertAdjacentHTML("afterbegin", response);
        var children = [].slice.call(newContainer.children);

        children.forEach(function (product) {
            product.page = pageNumber;
            if (scrollWay === "DOWN") {
                pContainerElem.append(product);
            }

            if (scrollWay === "UP") {
                pContainerElem.prepend(product);
            }
        });

        if (scrollWay === "DOWN") {
            productList.push(
                {
                    page: pageNumber,
                    start: children[0].offsetTop,
                    end: children[children.length - 1].offsetTop,
                }
            );
        }

        if (scrollWay === "UP") {
            var allProducts = document.querySelectorAll('.product');
            var pageSize = Math.ceil(allProducts.length / loadPageCounter);
            productList = [];

            for (var i = 1; i < pageSize; i++) {
                var firstProduct = allProducts[(i * loadPageCounter) - loadPageCounter];
                var lastProduct = allProducts[(i * loadPageCounter) - 1];
                productList.push(
                    {
                        page: firstProduct.page,
                        start: firstProduct.offsetTop,
                        end: lastProduct.offsetTop
                    }
                )
            }
            htmlElem.scrollTop = productList[0].end + productOffsetHeight;
        }

        setInterval(function () {
            lockRequest = false;
            if (!hasScrollBar()) {
                if (!lockNextPage) {
                    getPageService("DOWN");
                } else {
                    if (!lockPrePage) {
                        getPageService("UP");
                    }
                }
            } else {
                if (!lockPageLoadScrollPosition) {
                    lockPageLoadScrollPosition = true;

                    if (parseInt(loadPageNumber) > 0) {
                        setTimeout(function () {
                            htmlElem.scrollTop = productList[0].end + productOffsetHeight;
                        }, 500)
                    }
                }
            }
        }, 1000)
        window.productL = productList;
    }

    var ceheckCalledPageIsHave = function (pageNumber) {
        var filteredData = productList.filter(function (item) {
            return item.page === pageNumber;
        });
        if (filteredData.length > 0) {
            return true;
        }
        return false;
    }

    //ilk sayfayi bulma
    var getCalledFirstPage = function () {
        if (productList.length > 0) {
            return productList[0].page;
        }
        return -1;
    }

    //son sayfayi bulma
    var getCalledLastPage = function () {
        if (productList.length > 0) {
            return productList[productList.length - 1].page;
        }
        return -1;
    }


    var setPageNumberForElements = function (elements, pageNumber) {
        elements.forEach(function (element) {
            element.page = parseInt(pageNumber);
        });
        return elements;
    };

    var hasScrollBar = function () {
        return htmlElem.scrollHeight > window.innerHeight;
    }

    var productList = [];
    onLoadProductList();
    function onLoadProductList() {
        var allProducts = document.querySelectorAll('.product');
        allProducts = setPageNumberForElements(allProducts, loadPageNumber);
        productList.push(
            {
                page: allProducts[0].page,
                start: pContainerElem.offsetTop,
                end: allProducts[allProducts.length - 1].offsetTop,
                startObject: allProducts[0],
                endObject: allProducts[allProducts.length - 1]
            }
        );
    }

    if (!hasScrollBar()) {
        getPageService("DOWN");
    } else {
        if (parseInt(loadPageNumber) === 0) {
            lockPageLoadScrollPosition = true;
        }
    }
})();