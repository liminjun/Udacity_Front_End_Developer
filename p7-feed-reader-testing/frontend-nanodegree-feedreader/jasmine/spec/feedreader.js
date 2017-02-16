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


                expect(feed.url).toBeDefined();
                expect(typeof feed.url).toMatch("string");
                expect(feed.url.trim().length).not.toBe(0);
            });
        }
        for (var i = 0; i < allFeeds.length; i++) {
            var feed = allFeeds[i];
            testEachFeedInallFeeds(feed);
        };



        function testNameInAllFeeds(feed) {
            it('each feed has a name defined and that the name is not empty', function () {
                expect(feed.name).toBeDefined();
                expect(typeof feed.name).toMatch('string');
                expect(feed.name.trim().length).not.toBe(0);
            });
        };

        for (var i = 0; i < allFeeds.length; i++) {
            var feed = allFeeds[i];
            testNameInAllFeeds(feed);
        }

    });



    describe('The menu', function () {
        /* Test that ensures the menu element is hidden by default.*/
        it('the menu element is hidden by default', function () {
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });

        /* Test that ensures the menu changes visibility when the
		 *  menu icon is clicked. This test has two expectations:
		 *  the menu displays when clicked and hides when clicked again.
		 */
        it('the menu changes visibility when the menu icon is clicked', function () {
            expect($('body').hasClass("menu-hidden")).toBe(true);

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass("menu-hidden")).toBe(false);

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass("menu-hidden")).toBe(true);

        });

    });



    describe('Initial Entries', function () {


        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('there is at least a single .entry element within the .feed container', function () {
            var items = $('.feed').find('.entry');
            expect(items.length).toBeGreaterThan(0);
        });

    });

    describe('New Feed Selection', function () {

        var entries;

        beforeEach(function (done) {

            loadFeed(1, (function () {
                entries = $(".feed").html();
            }));

            done();

        });

        it('the content actually changes', function (done) {
            loadFeed(2,done);
            expect($(".feed").html()).not.toEqual(entries);
        });
    });




}());
