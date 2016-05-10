/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });



        function testEachFeedInallFeeds(feed) {
            it('each feed has a URL defined and that the URL is not empty', function () {
                var regularExpressionUrl = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.-A-Za-z]+)(?::(\d+))?(?:\/([^?#]))?(?:\?([^#]))?(?:#(.*))?$/;

                expect(feed.url).toMatch(regularExpressionUrl);
                expect(feed.url).not.toBe("");
            });
        }
        for (var i = 0; i < allFeeds.length; i++) {
            var feed = allFeeds[i];
            testEachFeedInallFeeds(feed);
        };

        function testNameInAllFeeds(feed) {
            it('each feed has a name defined and that the name is not empty', function () {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe("");
            });
        };

        for (var i = 0; i < allFeeds.length; i++) {
            var feed = allFeeds[i];
            testNameInAllFeeds(feed);
        }

    });



    describe('The menu', function () {

        it('the menu element is hidden by default', function () {
            expect($('body').hasClass("menu-hidden")).toBeTruthy();
        });




        it('the menu display when clicked and the menu hide when clicked again', function () {
            expect($('body').hasClass("menu-hidden")).toBeTruthy();

            $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass("menu-hidden")).not.toBeTruthy();
        });

    });



    describe('Initial Entries', function () {

        var entry;
        beforeEach(function (done) {
            $(".feed").empty();
            loadFeed(0, function () {
                entry = $('.feed').find(".entry").text();
                done();
            });

        });

        it('there is at least a single .entry element within the .feed container', function (done) {
            expect(entry).not.toEqual("");
            done();
        });

    });

    describe('New Feed Selection', function () {

        var entries_first;
        var entries_second;
        beforeEach(function (done) {
            $(".feed").empty();
            loadFeed(0, function () {
                entries_first = $('.feed').find("h2").text();
                loadFeed(1, function () {
                    entries_second = $('.feed').find("h2").text();
                    done();
                });
            });

        });

        it('the content actually changes', function (done) {
            expect(entries_first).not.toEqual(entries_second);
            done();
        });
    });




} ());
