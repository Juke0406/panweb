const nodeSchedule = require("./node_modules/node-schedule")

function telegramBot(bot) {

    let gotMessage = false;
    let period_mode = false;
    let busy_mode = false;
    let annoying_mode = false;
    let message = '';
    let text;
    let user;
    let owner = 597590359;
    let count = 0;

    nodeSchedule.scheduleJob("0 * 1 * *", () => {
        bot.sendMessage(772859792, "Remember to send money for savings!!")
    })

    bot.onText(/\/start/, async (msg) => {
        user = msg.chat.id
        count++;
        if (count === 1) {
            bot.sendMessage(user, "Hello!!")
            bot.sendMessage(user, "Hi Clarinda! This is Pan Pan's Telegram! I can help you : \n-Choose what to eat \n-Tell him you miss him", {
                "reply_markup" : {
                    "keyboard" : [["1. Help me choose what to eat"], ["2. Help me tell him I miss him"]],
                    one_time_keyboard : true
                }
            })
            bot.on("message", async (msg) => {
                text = msg.text.toLowerCase();

                if (text === "hello") {
                    bot.sendMessage(user, "Hi Clarinda! This is Pan Pan's Telegram! I can help you : \n-Choose what to eat \n-Tell him you miss him", {
                        "reply_markup" : {
                            "keyboard" : [["1. Help me choose what to eat"], ["2. Help me tell him I miss him"]],
                            one_time_keyboard : true
                        }
                    })
                }
                else
                if (text.includes("eat")) {
                    bot.sendMessage(user, "Are you working right now Mdm??", {
                        "reply_markup" : {
                            "keyboard" : [["Yes"], ["No"]],
                            one_time_keyboard : true
                        }
                    })
                }
                else
                if (text.includes("miss")) {
                    bot.sendMessage(user, "Do you want me to inform him and annoy him?", {
                        "reply_markup" : {
                            "keyboard" : [["Okay"], ["Don't want lah"]],
                            one_time_keyboard : true
                        }
                    })
                }
                else
                if (text.includes("love")) {
                    bot.sendMessage(user, "Awww, I am pretty sure he love you too.")
                    bot.sendMessage(owner, "HELLO!? 你的老婆讲她很爱你")
                    setTimeout(() => {
                        bot.sendMessage(owner, msg.text)
                    }, 750)
                }
                else
                if (text === "don't want lah") {
                    bot.sendMessage(owner, '您的老婆想你了')
                }
                else
                if (text === "okay") {
                    if (busy_mode) {
                        bot.sendMessage(user, "Sorry Mdm, I am unable to annoy him as he is currently busy now. He will reply you when he is free.")
                    }
                    else {
                        bot.sendMessage(user, "Right away!! Press stop for me to stop annoying him!", {
                            "reply_markup" : {
                                "keyboard" : [["STOP!!"]],
                                one_time_keyboard : true
                            }
                        })
                        annoying_mode = true
                    }
                }
                else
                if (text === "stop!!") {
                    bot.sendMessage(user, "Stopping right away!!")
                    annoying_mode = false
                }
                else
                if (text === "no") {
                    bot.sendMessage(user, "For which meal?", {
                        "reply_markup" : {
                            "keyboard" : [["Breakfast"], ["Brunch"], ["Lunch"], ["Tea Break"], ["Dinner"], ["Supper"], ["嘴巴痒"]],
                            one_time_keyboard : true
                        }
                    })
                }
                else
                if (text === "yes") {
                    if (!period_mode) {
                        bot.sendMessage(user, "You can \nEat: \n-McSpicy \n-Angus \n-Fillet O'Fish and McWings")
                        setTimeout(() => {
                            bot.sendMessage(user, 'You can also \nDrink: \n-Iced Latte \n-Iced Milo \n-Caramel Frappe \n-Mocha Frappe')
                        }, 750)
                    }
                    else {
                        bot.sendMessage(user, "You can \nEat: \n-Angus \n-Fillet O'Fish and McWings")
                        setTimeout(() => {
                            bot.sendMessage(user, 'You can also \nDrink: \n-Hot Milo \n-Warm Water!')
                        }, 750)
                    }
                }
                else
                if (text === "/start") {
                    bot.sendMessage(user, 'Sorry I might start repeating myself. \n If that occurs, please inform YJ about this!')
                    bot.sendMessage(owner, 'Duplicates of /start occurred. Please fixed me.')
                }
                else
                if ((text === "breakfast") ||
                (text === "brunch") ||
                (text === "lunch") ||
                (text === "tea break") ||
                (text === "dinner") ||
                (text === "supper") ||
                (text === "嘴巴痒") ||
                (text === "hungry")) {
    
                    let d = new Date();
                    let time = d.getTime() + (d.getTimezoneOffset() * 60000) + (3600000 * 8);
                    let t00 = new Date().setHours(0, 0, 0, 0); //12am 
                    let t07 = new Date().setHours(7, 0, 0, 0); //7am
                    let t08 = new Date().setHours(8, 0, 0, 0); //8am
                    let t10 = new Date().setHours(10, 0, 0, 0); //10am
                    let t12 = new Date().setHours(12, 0, 0, 0); //12pm
                    let t14 = new Date().setHours(14, 0, 0, 0); //2pm
                    let t15 = new Date().setHours(15, 0, 0, 0); //3pm
                    let t18 = new Date().setHours(18, 0, 0, 0); //6pm
                    let t20 = new Date().setHours(20, 0, 0, 0); //8pm
                    let t22 = new Date().setHours(22, 0, 0, 0); //10pm
                    let t24 = new Date().setDate(new Date().getDate() + 1)

                    if (text === "hungry") {
                        bot.sendMessage(user, "For which meal?", {
                            "reply_markup" : {
                                "keyboard" : [["Breakfast"], ["Brunch"], ["Lunch"], ["Tea Break"], ["Dinner"], ["Supper"], ["嘴巴痒"]],
                                one_time_keyboard : true
                            }
                        })
                    }
                    if (text === "breakfast") {
                        if (time > t00 && time < t07) {
                            bot.sendMessage(user, "You should be SLEEPING!!!")
                        } 
                        else
                        if (time > t07 && time < t08) {
                            bot.sendMessage(user, "Reach school then say.")
                        } 
                        else
                        if (time > t10 && time < t12) {
                            bot.sendMessage(user, "You should be eating BRUNCH now!!")
                        } 
                        else
                        if (time > t12 && time < t14) {
                            bot.sendMessage(user, "You should be eating LUNCH now!!")
                        } 
                        else
                        if (time > t14 && time < t15) {
                            bot.sendMessage(user, "You can have Tea Break or SLEEP!")
                        } 
                        else
                        if (time > t15 && time < t18) {
                            bot.sendMessage(user, "You should not be eating anything NOW!")
                        } 
                        else
                        if (time > t18 && time < t20) {
                            bot.sendMessage(user, "HELLO! NOW WAT TIME ALR STILL WANT BREAKFAST!?")
                        } 
                        else
                        if (time > t20 && time < t22) {
                            bot.sendMessage(user, "You want breakfast for tmr morning is it?")
                            setTimeout(() => {
                                bot.sendMessage(user, "Tmr then ask lah walao ask now...")
                            }, 750)
                        } 
                        else
                        if (time > t22 && time < t24) {
                            bot.sendMessage(user, "If really hungry then supper if not go sleep lah aiyo.")
                        }
                        else {
                            bot.sendMessage(user, "You can \nDrink: \n-Milo \n-Milk \nEat: \n-Bao \n-Lo Mai Gai \n-Bee Hoon \n-Small SNACKS!")
                        }
                    }
                    if (text === "brunch") {
                        if (time > t00 && time < t07) {
                            bot.sendMessage(user, "You should be SLEEPING LA STILL WANT EAT!")
                        } 
                        else
                        if (time > t07 && time < t08) {
                            bot.sendMessage(user, "Eh harlo, early morning want semo brunch")
                        } 
                        else
                        if (time > t08 && time < t10) {
                            bot.sendMessage(user, "You should be eating BREAKFAST now!!")
                        } 
                        else
                        if (time > t12 && time < t14) {
                            bot.sendMessage(user, "You should be eating LUNCH now!!")
                        } 
                        else
                        if (time > t14 && time < t15) {
                            bot.sendMessage(user, "You can have Tea Break or SLEEP!")
                        } 
                        else
                        if (time > t15 && time < t1a8) {
                            bot.sendMessage(user, "sHHHH... go sleep better..")
                        } 
                        else
                        if (time > t18 && time < t20) {
                            bot.sendMessage(user, "HELLO! NOW WAT TIME ALR DINNER ALR LAH!!")
                        } 
                        else
                        if (time > t20 && time < t22) {
                            bot.sendMessage(user, "You want food har? Ask for supper option")
                        } 
                        else
                        if (time > t22 && time < t24) {
                            bot.sendMessage(user, "If really hungry then supper if not go sleep lah aiyo.")
                        }
                        else {
                            bot.sendMessage(user, "You can \nEat: \n-Waffles \n-Bao \n-Tteokbokki \n-猪肠粉 \n-Siew Mai \n-Small SNACKS!")
                        }
                    }
                    if (text === "lunch") {
                        if (time > t00 && time < t07) {
                            bot.sendMessage(user, "SLEEEP!!!!!")
                        } 
                        else
                        if (time > t07 && time < t08) {
                            bot.sendMessage(user, "Wait awhile more thn breakfast le..")
                        } 
                        else
                        if (time > t08 && time < t10) {
                            bot.sendMessage(user, "You should be eating BREAKFAST now!!")
                        } 
                        else
                        if (time > t10 && time < t12) {
                            bot.sendMessage(user, "You should be eating BRUNCHHHHHHHHHHHH now!!")
                        } 
                        else
                        if (time > t14 && time < t15) {
                            bot.sendMessage(user, "You can have Tea Break or SLEEP!")
                        } 
                        else
                        if (time > t15 && time < t18) {
                            bot.sendMessage(user, "zzz")
                        } 
                        else
                        if (time > t18 && time < t20) {
                            bot.sendMessage(user, "HELLO! U WAN EAT LUNCH AT DINNER TIMING AH")
                        } 
                        else
                        if (time > t20 && time < t22) {
                            bot.sendMessage(user, "Please pick supper option...")
                        } 
                        else
                        if (time > t22 && time < t24) {
                            bot.sendMessage(user, "If really hungry then supper if not go sleep lah aiyo.")
                        }
                        else {
                            bot.sendMessage(user, "You can \nEat: \n-Chicken Rice \n-Western \n-KKM \n-mala \n-Maggie Mee!!")
                        }
                    }
                    if (text === "tea break") {
                        if (time > t00 && time < t07) {
                            bot.sendMessage(user, "去睡觉")
                        } 
                        else
                        if (time > t07 && time < t08) {
                            bot.sendMessage(user, "You must be trolling me... is not even breakfast timing...")
                        } 
                        else
                        if (time > t08 && time < t10) {
                            bot.sendMessage(user, "You should be eating BREAKFAST now!!")
                        } 
                        else
                        if (time > t10 && time < t12) {
                            bot.sendMessage(user, "Brunch time lehh not tea break time...")
                        } 
                        else
                        if (time > t12 && time < t14) {
                            bot.sendMessage(user, "Eh now Lunch time right... want semo tea break.....")
                        } 
                        else
                        if (time > t15 && time < t18) {
                            bot.sendMessage(user, "sHHHH... go sleep better..")
                        } 
                        else
                        if (time > t18 && time < t20) {
                            bot.sendMessage(user, "HELLO! NOW WAT TIME ALR DINNER ALR LAH!!")
                        } 
                        else
                        if (time > t20 && time < t22) {
                            bot.sendMessage(user, "You want food har? Ask for supper option")
                        } 
                        else
                        if (time > t22 && time < t24) {
                            bot.sendMessage(user, "If really hungry then supper if not go sleep lah aiyo.")
                        }
                        else {
                            bot.sendMessage(user, "You can \nEat: \n-Chocolate \n-Cake \n-Biscuits!")
                        }
                    }
                    if (text === "dinner") {
                        if (time > t00 && time < t07) {
                            bot.sendMessage(user, "很晚了去睡觉...")
                        } 
                        else
                        if (time > t07 && time < t08) {
                            bot.sendMessage(user, "还没早餐就想吃啊")
                        } 
                        else
                        if (time > t08 && time < t10) {
                            bot.sendMessage(user, "现在几点了, 还是晚餐咩?")
                        } 
                        else
                        if (time > t10 && time < t12) {
                            bot.sendMessage(user, "中午都还没到")
                        } 
                        else
                        if (time > t12 && time < t14) {
                            bot.sendMessage(user, "哇佬, 先在是午餐时间好不好...")
                        } 
                        else
                        if (time > t15 && time < t18) {
                            bot.sendMessage(user, "哎呀睡觉比较好.")
                        } 
                        else
                        if (time > t20 && time < t22) {
                            bot.sendMessage(user, "最好是不要吃啦...")
                        } 
                        else
                        if (time > t22 && time < t24) {
                            bot.sendMessage(user, "真的肚子饿的话, 去拿点小吃.")
                        }
                        else {
                            bot.sendMessage(user, "You can \nEat: \n-鸡饭 \n-KFC \n-McDonald \n-Maggie Mee \n-麻辣")
                        }
                    }
                    if (text === "supper") {
                        if (time > t07 && time < t08) {
                            bot.sendMessage(user, "er... now is breakfast wor....")
                        } 
                        else
                        if (time > t08 && time < t10) {
                            bot.sendMessage(user, "hello!? you eat breakfast alr a not!?!?")
                        } 
                        else
                        if (time > t10 && time < t12) {
                            bot.sendMessage(user, "weh... haven even half a day.. thinking of supper already ah.")
                        } 
                        else
                        if (time > t12 && time < t14) {
                            bot.sendMessage(user, "niama... now lunch u asking me supper..")
                        } 
                        else
                        if (time > t15 && time < t18) {
                            bot.sendMessage(user, "take nap la!")
                        } 
                        else
                        if (time > t18 && time < t20) {
                            bot.sendMessage(user, "Dinner first can a not...")
                        }
                        else
                        if (time > t20 && time < t22) {
                            bot.sendMessage(user, "better study!!")
                        } 
                        else {
                            bot.sendMessage(user, "Eat Maggie Mee lor.. Or if got cake can eat cake! ORRRR YOUR FAV SNACK!")
                            setTimeout(() => {
                                bot.sendMessage(user, "CalBEEEEEEE!")
                            }, 750)
                        }
                    }
                    if (text === "嘴巴痒") {
                        bot.sendMessage(user, "Please wait a moment, contacting Mr YongJun right now...")
                        bot.sendMessage(owner, "Hello Sir! Your 老婆 is stressed and feel like eating something. Please advice her.")
                        bot.once('message', (msg) => {
                            if (user === owner && msg.text === "ok") {
                                bot.sendMessage(user, "Mr YongJun is gonna contact you soon.. Please wait for his message")
                            }
                        })
                    }
                }
                else {
                    bot.sendMessage(user, "I'm sorry, I am clearly not taught what is that.")
                    bot.sendMessage(owner, `Clarinda mentioned "${text}"`)
                }

                if (user === owner) {
                    if (message === "hello") {
                        bot.sendMessage(owner, 'Hi Sir! How can I help you?', {
                            "reply_markup" : {
                                "keyboard" : [["Log Period"], ["Busy"], ["Message"]],
                                one_time_keyboard : true
                            }
                        })
                    }
                    else
                    if (message === "log period") {
                        bot.sendMessage(owner, 'Does she have period now?', {
                            "reply_markup" : {
                                "keyboard" : [["Yes"], ["No"]],
                                one_time_keyboard : true
                            }
                        })
                    }
                    else
                    if (message === "yes") {
                        period_mode = true;
                    }
                    else
                    if (message === "no") {
                        period_mode = false;
                    }
                    else
                    if (message === "busy") {
                        bot.sendMessage(owner, 'Does you want me to overwrite her command?', {
                            "reply_markup" : {
                                "keyboard" : [["Okay"], ["Itsokay"]],
                                one_time_keyboard : true
                            }
                        })
                    }
                    else
                    if (message === "okay") {
                        busy_mode = true;
                    }
                    else 
                    if (message === "itsokay") {
                        busy_mode = false;
                    }
                    else
                    if (message === "message") {
                        gotMessage = true
                        message = msg.text
                    }
                }
            })
        }
        else
        if (count > 1) {
            bot.removeTextListener(/\/start/)
            count-=2;
        }

        if (gotMessage) {
            nodeSchedule.scheduleJob("0 0 * * *", () => {
                bot.sendMessage(user, message)
            })
        }
    
        setInterval(() => {
            if (annoying_mode && !busy_mode) {
                bot.sendMessage(owner, '您的老婆想你了')
            }
        }, 5000)
        
    })
    
    bot.on("polling_error", console.log);

}

module.exports.telegramBot = telegramBot