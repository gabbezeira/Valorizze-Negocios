!(function (t, e) {
    "use strict";
    var i = "addEventListener",
        o = "getElementsByClassName",
        n = "createElement",
        s = "classList",
        d = "appendChild",
        l = "dataset",
        a = "embed-lightbox-iframe",
        h = "embed-lightbox-is-loaded",
        r = "embed-lightbox-is-opened",
        c = "embed-lightbox-is-showing",
        m = function (t, i, n) {
            var s = n || {};
            (this.trigger = t),
                (this.elemRef = i),
                (this.rate = s.rate || 500),
                (this.el = e[o](a)[0] || ""),
                (this.body = this.el ? this.el[o]("embed-lightbox-body")[0] : ""),
                (this.content = this.el ? this.el[o]("embed-lightbox-content")[0] : ""),
                (this.href = t[l].src || ""),
                (this.paddingBottom = t[l].paddingBottom || ""),
                (this.onOpened = s.onOpened),
                (this.onIframeLoaded = s.onIframeLoaded),
                (this.onLoaded = s.onLoaded),
                (this.onCreated = s.onCreated),
                this.init();
        };
    (m.prototype.init = function () {
        var t = this;
        this.el || this.create();
        var e,
            o,
            n,
            s,
            d,
            l,
            a =
                ((e = function (e) {
                    e.preventDefault(), t.open();
                }),
                (o = this.rate),
                function () {
                    (d = this), (s = [].slice.call(arguments, 0)), (l = new Date());
                    var t = function () {
                        var i = new Date() - l;
                        i < o ? (n = setTimeout(t, o - i)) : ((n = null), e.apply(d, s));
                    };
                    n || (n = setTimeout(t, o));
                });
        this.trigger[i]("click", a);
    }),
        (m.prototype.create = function () {
            var t = this,
                o = e[n]("div");
            (this.el = e[n]("div")),
                (this.content = e[n]("div")),
                (this.body = e[n]("div")),
                this.el[s].add(a),
                o[s].add("embed-lightbox-backdrop"),
                this.content[s].add("embed-lightbox-content"),
                this.body[s].add("embed-lightbox-body"),
                this.el[d](o),
                this.content[d](this.body),
                (this.contentHolder = e[n]("div")),
                this.contentHolder[s].add("embed-lightbox-content-holder"),
                this.contentHolder[d](this.content),
                this.el[d](this.contentHolder),
                e.body[d](this.el),
                o[i]("click", function () {
                    t.close();
                });
            var l = function () {
                t.isOpen() || (t.el[s].remove(c), (t.body.innerHTML = ""));
            };
            this.el[i]("transitionend", l, !1), this.el[i]("webkitTransitionEnd", l, !1), this.el[i]("mozTransitionEnd", l, !1), this.el[i]("msTransitionEnd", l, !1), this.callCallback(this.onCreated, this);
        }),
        (m.prototype.loadIframe = function () {
            var t,
                i,
                o = this;
            (this.iframeId = a + "-" + this.elemRef),
                (this.body.innerHTML =
                    '<iframe src="' +
                    this.href +
                    '" name="' +
                    this.iframeId +
                    '" id="' +
                    this.iframeId +
                    '" onload="this.style.opacity=1;" style="opacity:0;border:none;" scrolling="no" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true" height="166" frameborder="no"></iframe>'),
                (t = this.iframeId),
                (i = this.body),
                (e.getElementById(t).onload = function () {
                    (this.style.opacity = 1), i[s].add(h), o.callCallback(o.onIframeLoaded, o), o.callCallback(o.onLoaded, o);
                });
        }),
        (m.prototype.open = function () {
            this.loadIframe(), this.paddingBottom ? (this.content.style.paddingBottom = this.paddingBottom) : this.content.removeAttribute("style"), this.el[s].add(c), this.el[s].add(r), this.callCallback(this.onOpened, this);
        }),
        (m.prototype.close = function () {
            this.el[s].remove(r), this.body[s].remove(h);
        }),
        (m.prototype.isOpen = function () {
            return this.el[s].contains(r);
        }),
        (m.prototype.callCallback = function (t, e) {
            "function" == typeof t && t.bind(this)(e);
        }),
        (t.EmbedSocialIframeLightbox = m);
})("undefined" != typeof window ? window : this, document);
if (!document.getElementById("EmbedSocialIFrame")) {
    var jsEmbed = document.createElement("script");
    (jsEmbed.id = "EmbedSocialIFrame"), (jsEmbed.src = "https://embedsocial.com/js/iframe.js"), document.getElementsByTagName("body")[0].appendChild(jsEmbed);
}
if (!document.getElementById("EmbedSocialIFrameLightboxCSS")) {
    var cssEmbed = document.createElement("link");
    (cssEmbed.id = "EmbedSocialIFrameLightboxCSS"), (cssEmbed.rel = "stylesheet"), (cssEmbed.href = "https://embedsocial.com/cdn/iframe-lightbox.min.css?v=2.0");
    document.getElementsByTagName("head")[0].appendChild(cssEmbed);
}
EMBEDSOCIALHASHTAG = {
    getEmbedData: function (albumRef, albumDiv) {
        var iframes = albumDiv.getElementsByTagName("iframe");
        if (iframes.length <= 0) {
            var ifrm = document.createElement("iframe");
            var iframeId = "embedIFrame_" + albumRef + Math.random().toString(36).substring(7);
            var srcIfrm = "https://embedsocial.com/api/pro_hashtag/" + albumRef + "/";
            ifrm.setAttribute("src", srcIfrm);
            ifrm.setAttribute("id", iframeId);
            ifrm.setAttribute("class", "embedsocial-hashtag-iframe");
            ifrm.style.width = "100%";
            ifrm.style.height = "100%";
            ifrm.style.border = "0";
            ifrm.setAttribute("scrolling", "no");
            albumDiv.appendChild(ifrm);
            EMBEDSOCIALHASHTAG.initResizeFrame(albumRef, iframeId);
            EMBEDSOCIALHASHTAG.initFreeLinkClass(albumDiv);
        } else {
            var srcIfrm = "https://embedsocial.com/api/pro_hashtag/" + albumRef + "/";
            for (var j = 0; j < iframes.length; j++) {
                iframes[j].setAttribute("src", srcIfrm);
                iframes[j].setAttribute("class", "embedsocial-hashtag-iframe");
                EMBEDSOCIALHASHTAG.initResizeFrame(albumRef, iframes[j].getAttribute("id"));
                EMBEDSOCIALHASHTAG.initFreeLinkClass(albumDiv);
            }
        }
        setTimeout(function () {
            for (var j = 0; j < iframes.length; j++) {
                iframes[j].parentElement.classList.remove("embedsocial-widget-loading");
            }
        }, 2e3);
    },
    initResizeFrame: function (albumRef, iframeId) {
        if (document.getElementById("EmbedSocialIFrame") && "function" === typeof iFrameResize) {
            iFrameResize(
                {
                    messageCallback: function (messageData) {
                        if (messageData.message.action === "remove_free_banner") {
                            EMBEDSOCIALHASHTAG.removeFreeBanner(messageData.message);
                        }
                        if (messageData.message.action === "create") {
                            EMBEDSOCIALHASHTAG.createLightBox(messageData.message);
                        }
                        if (messageData.message.hasOwnProperty("navigationCode")) {
                            EMBEDSOCIALHASHTAG.navigationLightBox(albumRef, messageData.message.navigationCode);
                        }
                        if (messageData.message.hasOwnProperty("openLinkInNewTab")) {
                            EMBEDSOCIALHASHTAG.openLinkInNewTab(messageData.message.link);
                        }
                    },
                    resizedCallback: function (messageData) {
                        messageData.iframe.parentElement.classList.remove("embedsocial-widget-loading");
                    },
                },
                ".embedsocial-hashtag-iframe"
            );
            iFrameResize(
                {
                    messageCallback: function (messageData) {
                        if (messageData.message.action === "close") {
                            EMBEDSOCIALHASHTAG.closeLightBox(messageData.message);
                        }
                    },
                    sizeHeight: false,
                    sizeWidth: false,
                },
                "#embed-lightbox-iframe-" + albumRef
            );
            var ifr = document.getElementById(iframeId);
            if (ifr) {
                EMBEDSOCIALHASHTAG.freeLinkClass(ifr.parentElement);
                setTimeout(function () {
                    ifr.iFrameResizer.sendMessage({ hasOpenLinkInNewTab: true });
                }, 1e3);
            }
        } else {
            setTimeout(function () {
                EMBEDSOCIALHASHTAG.initResizeFrame(albumRef, iframeId);
            }, 200);
        }
    },
    createLightBox: function (data) {
        if (!document.getElementById("embed-lightbox-" + data.albumRef)) {
            var divLightbox = document.createElement("a");
            divLightbox.setAttribute("class", "embedsocail-iframe-lightbox-link");
            divLightbox.setAttribute("id", "embed-lightbox-" + data.albumRef);
            divLightbox.setAttribute("data-src", data.src);
            document.body.appendChild(divLightbox);
        } else {
            divLightbox = document.getElementById("embed-lightbox-" + data.albumRef);
            divLightbox.setAttribute("data-src", data.src);
            divLightbox.innerHTML = "";
        }
        [].forEach.call(document.getElementsByClassName("embedsocail-iframe-lightbox-link"), function (el) {
            el.lightbox = new EmbedSocialIframeLightbox(el, data.albumRef, {
                onLoaded: function (iframe) {
                    EMBEDSOCIALHASHTAG.initResizeFrame(data.albumRef, data.iframeId);
                    function lightBoxIframeResize() {
                        var windowHeight = window.innerHeight || document.documentElement.clientHeight;
                        var windowWidth = window.innerWidth || document.documentElement.clientWidth;
                        if (windowHeight > 1800) {
                            windowHeight = 1800;
                        }
                        var iframeEl = document.getElementById("embed-lightbox-iframe-" + data.albumRef);
                        if (typeof iframeEl !== "undefined" && iframeEl !== null) {
                            if (windowWidth < 911) {
                                iframeEl.style.height = parseInt(windowHeight) + "px";
                            } else {
                                iframeEl.style.height = parseInt(windowHeight * 0.95) + "px";
                            }
                        }
                    }
                    lightBoxIframeResize();
                    window.addEventListener("resize", lightBoxIframeResize);
                },
            });
        });
        EMBEDSOCIALHASHTAG.openLightBox(data);
    },
    openLightBox: function (data) {
        document.getElementById("embed-lightbox-" + data.albumRef).click();
        document.getElementsByClassName("embed-lightbox-body")[0].addEventListener("click", function (event) {
            var targetElement = event.target || event.srcElement;
            if (targetElement.classList.contains("embed-lightbox-is-loaded")) {
                EMBEDSOCIALHASHTAG.closeLightBox(data);
            }
        });
        window.addEventListener(
            "keydown",
            function (e) {
                var e = window.event ? window.event : e;
                if (document.getElementById("embed-lightbox-iframe-" + data.albumRef)) {
                    var keys = [37, 39, 27];
                    if (keys.indexOf(e.keyCode) > -1) {
                        EMBEDSOCIALHASHTAG.navigationLightBox(data.albumRef, e.keyCode);
                    }
                }
            },
            true
        );
    },
    closeLightBox: function (data) {
        document.getElementsByClassName("embed-lightbox-backdrop")[0].click();
        [].forEach.call(document.getElementsByClassName("embed-lightbox-body"), function (el) {
            el.className = "embed-lightbox-body";
        });
        if (data.activePage && data.activePage != -1) {
            document.getElementById(data.iframeId).src = "https://embedsocial.com/api/pro_hashtag/" + data.albumRef + "/" + data.activePage;
        }
    },
    navigationLightBox: function (albumRef, code) {
        var iframe = document.getElementById("embed-lightbox-iframe-" + albumRef);
        if (iframe) {
            iframe.iFrameResizer.sendMessage({ navigationCode: code });
        }
    },
    removeFreeBanner: function (data) {
        if (data.version !== "free") {
            var iframe = document.getElementById(data.iframeId);
            if (iframe) {
                var freeBanners = iframe.parentElement.getElementsByClassName("feed-powered-by-es");
                for (var j = 0; j < freeBanners.length; j++) {
                    freeBanners[j].parentElement.removeChild(freeBanners[j]);
                }
            }
        }
    },
    initFreeLinkClass: function (albumDiv) {
        window.addEventListener("resize", function () {
            EMBEDSOCIALHASHTAG.freeLinkClass(albumDiv);
        });
    },
    freeLinkClass: function (albumDiv) {
        var freeLinks = albumDiv.getElementsByClassName("feed-powered-by-es");
        for (var j = 0; j < freeLinks.length; j++) {
            freeLinks[j].className = albumDiv.offsetWidth < 768 ? "feed-powered-by-es feed-powered-by-es-center" : "feed-powered-by-es";
        }
    },
    openLinkInNewTab: function (link) {
        window.open(link);
    },
};
if ("IntersectionObserver" in window) {
    function callVisible(e, t) {
        for (j in e) e[j].isIntersecting && EMBEDSOCIALHASHTAG.getEmbedData(e[j].target.getAttribute("data-ref").trim(), e[j].target);
    }
}
function standardLoad(e) {
    for (var j = 0; j < e.length; j++) {
        var t = e[j],
            o = t.getAttribute("data-ref").trim();
        t.classList.add("embedsocial-widget-loading");
        if ("yes" === t.getAttribute("data-lazyload") && "IntersectionObserver" in window) new IntersectionObserver(callVisible, {}).observe(t);
        else EMBEDSOCIALHASHTAG.getEmbedData(o, t);
    }
}
var er = document.getElementsByClassName("embedsocial-hashtag");
er.length > 0
    ? standardLoad(er)
    : window.addEventListener("load", function () {
          standardLoad(document.getElementsByClassName("embedsocial-hashtag"));
      });
