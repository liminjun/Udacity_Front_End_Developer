var bio = {
    "name": "Lee Li",
    "role": "Web Front-End Developer",
    "contacts": {
        "mobile": "18896724808",
        "email": "v-leeli@hotmail.com",
        "github": "liminjun",
        "twitter": "liminjun",
        "location": "Suzhou"
    },
    "welcomeMessage": "Welcome to Udacity",
    "skills": ["html", "css", "javascript","jQuery","AngularJS"],
    "bioPic": "images/my.jpg",
    "display": function () {
        var headerName = HTMLheaderName.replace("%data%", bio.name);
        var headerRole = HTMLheaderRole.replace("%data%", bio.role);

        var mobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
        var email = HTMLemail.replace("%data%", bio.contacts.email);
        var twitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
        var github = HTMLgithub.replace("%data%", bio.contacts.github);

        var location = HTMLlocation.replace("%data%", bio.contacts.location);

        $("#header").prepend(headerRole);
        $("#header").prepend(headerName);


        $("#topContacts").append(mobile).append(email).append(twitter).append(github).append(location);

        $("#footerContacts").append(mobile).append(email).append(twitter).append(github).append(location);

        var bioPic = HTMLbioPic.replace("%data%", bio.bioPic);
        var welcomeMsg = HTMLWelcomeMsg.replace("%data%", bio.welcomeMessage);


        $("#header").append(bioPic).append(welcomeMsg).append(HTMLskillsStart);
        for (var i = 0; i < bio.skills.length; i++) {
            var skill = HTMLskills.replace("%data%", bio.skills[i]);

            $("#skills").append(skill);
        }

    }
}

bio.display();

var work = {
    jobs: [{
        employer: "China Mobile",
        title: "Web Developer",
        location: "Suzhou",
        dates: "2015.10-In Progress",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque voluptatem iste omnis blanditiis quidem, quo animi placeat consectetur! Ea nulla dolorem vero possimus, rem neque. Cumque esse, molestiae nihil numquam!"
    },
        {
            employer: "Adchina",
            title: "Web Developer",
            location: "Shanghai",
            dates: "2013.4-2015.10",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque voluptatem iste omnis blanditiis quidem, quo animi placeat consectetur! Ea nulla dolorem vero possimus, rem neque. Cumque esse, molestiae nihil numquam!"
        }],
    display: function () {
        $("#workExperience").append(HTMLworkStart);
        for (var i = 0; i < work.jobs.length; i++) {
            var workObj = work.jobs[i];
            var employer = HTMLworkEmployer.replace("%data%", workObj.employer);
            var title = HTMLworkTitle.replace("%data%", workObj.title);
            var location =HTMLworkLocation.replace("%data%", workObj.location);
            var dateHTML = HTMLworkDates.replace("%data%", workObj.dates);
            var description = HTMLworkDescription.replace("%data%", workObj.description);
            $(".work-entry").append(employer).append(title).append(location)
                .append(dateHTML).append(description);
        }

    }
};
work.display();

var education = {
    schools: [{
        name: "NanChang University",
        location: "Nanchang",
        degree: "Master",
        dates: "2007.9-2011.7",
        url: "www.ncu.cn",
        majors: ["Software Engineering", "Softwar Testing"]
    }],
    onlineCourses: [
        {
            title: "Front-End Nanodegree",
            school: "Udacity",
            date: "2016.4.-2016.6",
            url: "https://cn.udacity.com/course/front-end-web-developer-nanodegree--nd001/"
        }
    ],
    display: function () {
        $("#education").append(HTMLschoolStart);

        for (var i = 0; i < education.schools.length; i++) {
            var schoolObj = education.schools[i];


            var schoolName = HTMLschoolName.replace("%data%", schoolObj.name);
            var schoolDegree = HTMLschoolDegree.replace("%data%", schoolObj.degree);
            var schoolDates = HTMLschoolDates.replace("%data%", schoolObj.dates);
            var schoolLocation = HTMLschoolLocation.replace("%data%", schoolObj.location);


            var schoolMajor = HTMLschoolMajor.replace("%data%", schoolObj.majors);

            $(".education-entry").append(schoolName).append(schoolDegree).append(schoolDates)
                .append(schoolLocation).append(schoolMajor);
        }

        $(".education-entry").append(HTMLonlineClasses);

        for (var j = 0; j < education.onlineCourses.length; j++) {
            var onlineCourseObj = education.onlineCourses[j];


            var onlineTitle = HTMLonlineTitle.replace("%data%", onlineCourseObj.title);
            var onlineSchool = HTMLonlineSchool.replace("%data%", onlineCourseObj.school);
            var onlineDates = HTMLonlineDates.replace("%data%", onlineCourseObj.date);
            var onlineURL = HTMLonlineURL.replace("%data%", onlineCourseObj.url);


            $(".education-entry").append(onlineTitle).append(onlineSchool).append(onlineDates)
                .append(onlineURL);
        }

    }
};
education.display();





var projects = {
    projects: [{
        title: "Project A",
        dates: "2016-4-25",
        description: "A web project using html and css",
        images: ["images/197x148.gif", "images/197x148.gif"]
    }, {
            title: "Project B",
            dates: "2016-4-25",
            description: "A web project using html and css",
            images: ["images/197x148.gif", "images/197x148.gif"]
        }],
    display: function () {
        $("#projects").append(HTMLprojectStart);

        for (var i = 0; i < projects.projects.length; i++) {
            var projectObj = projects.projects[i];


            var projectTitle = HTMLprojectTitle.replace("%data%", projectObj.title);
            var projectDates = HTMLprojectDates.replace("%data%", projectObj.dates);
            var projectDescription = HTMLprojectDescription.replace("%data%", projectObj.description);

            $(".project-entry").append(projectTitle).append(projectDates).append(projectDescription);

            for (var j = 0; j < projectObj.images.length; j++) {
                var projectImageObj = projectObj.images[j];
                var projectImage = HTMLprojectImage.replace("%data%", projectImageObj);

                $(".project-entry").append(projectImage)
            }


        }
    }
};

projects.display();

$("#mapDiv").append(googleMap);