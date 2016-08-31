(function() {
    'use strict';

    angular
        .module('app')
        .controller('GamesPlayController', GamesPlayController);

    GamesPlayController.$inject = [
        '$location',
        '$cookies',
        '$route',
        '$customMessaging',
        'questionFactory',
        'userFactory',
        'gameFactory'
    ];

    /* @ngInject */
    function GamesPlayController($location, $cookies, $route, $customMessaging,
            questionFactory, userFactory, gameFactory) {
        var vm = this;
        var questions = [];
        var correctAnswers = {};

        vm.answers = {};
        vm.cards = [];
        vm.home = home;
        vm.name = '';
        vm.submit = submit;

        activate();

        function activate() {
            name = $cookies.get('name');

            if (!name) {
                $location.url('/');
            } else {
                vm.name = name;

                questionFactory.index((err, data) => {
                    questions = data.questions;

                    createCards();
                });
            }
        }

        function createCards() {
            if (questions.length < 3) {
                $customMessaging.add('Missing questions, please add at least 3.');
                $location.url('/dashboard');
                return;
            }

            var answers = {
                1: 'correctAnswer',
                2: 'fake1',
                3: 'fake2'
            };
            var visited = {
                0: false,
                1: false,
                2: false
            };
            var i = 0;

            while (i < 3) {
                var rQuestion = Math.floor(Math.random() * questions.length - 1);

                if (!visited[rQuestion]) {
                    var j = 0;
                    var vAnswers = {
                        0: null,
                        1: null,
                        2: null
                    };
                    var card = {question: questions[rQuestion].question};

                    visited[rQuestion] = true;

                    while (j < 3) {
                        rAnswer = Math.floor(Math.random() * 2);

                        if (!vAnswers[rAnswer]) {
                            vAnswers[rAnswer] = j;

                            if (rAnswer === 0) {
                                correctAnswers[i] = j;
                            }

                            card['answer'+j] = questions[rQuestion][answers[rAnswer]];
                            j++;
                        }
                    }

                    vm.cards.push(card);

                    i++;
                }
            }
        }

        function home() {
            $location.url('/dashboard');
        }

        function submit() {
            var correctCount = 0;

            for (var i = 0; i < 3; i++) {
                if (vm.answers[i] == correctAnswers[i]) {
                    correctCount++;
                }
            }

            var percent = ((correctCount/3) * 100).toPrecision(3);

            gameFactory.create({name: vm.name, correct: correct, total: 3}, (err, data) => {
                if (err) {
                    // do something
                } else {
                    $customMessaging.add(`That was great, ${name} Your score is ${correctCount}/3 (${percent}%).`);
                    $loaction.url('/dashboard');
                }
            });
        }
    }
})();
