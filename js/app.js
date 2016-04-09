$(function () {
    var anim = false;

    function typed(finish_typing) {
        return function (term, message, delay, finish) {
            anim = true;
            var prompt = term.get_prompt();
            var c = 0;
            if (message.length > 0) {
                term.set_prompt('');
                var interval = setInterval(function () {
                        term.insert(message[c++]);
                        if (c == message.length) {
                            clearInterval(interval);
                            // execute in next interval
                            setTimeout(function () {
                                // swap command with prompt
                                finish_typing(term, message, prompt);
                                anim = false
                                finish && finish();
                            }, delay);
                        }
                    }
                    , delay);
            }
        };
    }
    var typed_prompt = typed(function (term, message, prompt) {
        // swap command with prompt
        term.set_command('');
        term.set_prompt(message + ' ');
    });
    var typed_message = typed(function (term, message, prompt) {
        term.set_command('');
        term.echo(message);
        term.set_prompt(prompt);
    });

    $('#console').terminal(function (cmd, term) {
        var finish = false;
        if (cmd == "-help") {
            term.echo("\n")
            term.echo("[-help]              Display this message");
            term.echo("[-whoami]            Display information about me");
            term.echo("[-contact]           Display contact information");
            term.echo("[-work]              Display links to my previous work");
            term.echo("[-standardPortfolio] I get that CLI's are not for everyone");
            term.echo("\n");
        } else {
            term.echo("no such command")
        }
        var args = {
            command: cmd
        };

    }, {
        name: 'xxx'
        , greetings: null
        , height: 500
        , outputLimit: 0
        , prompt: '[karl-zarko ~]# '
        , onInit: function (term) {
            // first question
            var progressBar = "[̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅] 100%"
            var arr = ["Including Stuff.h", "Opening valves", "Rescuing kittens", "Researching dark matter", "Doing seriously complex math", "Calibrating satelites", "Skydiving", "Observing space time", "Calling repair bots", "Preforming jedi mind tricks", "Learning assembly"];

            arr.sort(function () {
                return 0.5 - Math.random()
            });


            /*
                        term.echo(arr[0]);
                        typed_message(term, progressBar, 10, function () {
                            term.echo(arr[1]);
                            typed_message(term, progressBar, 6, function () {
                                term.echo(arr[2]);
                                typed_message(term, progressBar, 12, function () {
                                    term.echo(arr[3]);
                                    typed_message(term, progressBar + "\n", 15, function () {
                                        term.clear();
                                        typed_message(term, "Hi there! Sorry about the wait, I was just out doing super cool stuff", 40, function () {
                                            typed_message(term, "I'm Theo by the way! developer, tinkerer, musician, boyfriend", 35, function () {
                                                typed_message(term, "Enter '-help' to see avaliable commands", 35, function () {});
                                            });
                                        });
                                    });
                                });
                            });
                        });*/



        }
        , keydown: function (e) {
            //disable keyboard when animating
            if (anim) {
                return false;
            }
        }
    });
});


$('#some_id').terminal({
    echo: function (arg1) {
        this.echo(arg1);
    }
    , rpc: 'some_file.php'
    , calc: {
        add: function (a, b) {
            this.echo(a + b);
        }
        , sub: function (a, b) {
            this.echo(a - b);
        }
    }
}, {
    prompt: '>'
    , greeting: false
});
