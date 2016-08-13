// JavaScript Document
       // 音乐配置
    var audioConfig = {
        enable: true, // 是否开启音乐
        playURl: 'music/happy.wav', // 正常播放地址
        cycleURL: 'music/circulation.wav' // 正常循环播放地址
    };

    /////////
    //背景音乐 //
    /////////
    function Hmlt5Audio(url, isloop) {
        var audio = new Audio(url);
        audio.autoPlay = true;
        audio.loop = isloop || false;
        audio.play();
        return {
            end: function(callback) {
                audio.addEventListener('ended', function() {
                    callback();
                }, false);
            }
        };
    }

    // 开始
        var audio1 = Hmlt5Audio(audioConfig.playURl);
        audio1.end(function() {
           Hmlt5Audio(audioConfig.cycleURL, true);
        });
// JavaScript Document
$(function(){		
     /////////
    //右边飞鸟 //
    /////////
    var bird = {
        elem: $(".bird"),
        fly: function() {
            this.elem.addClass('birdFly')
            this.elem.transition({
                right: container.width()
            }, 15000, 'linear');
        }
    };
var logo = {
        elem: $('.logo'),
        run: function() {
            this.elem.addClass('logolightSpeedIn')
                .on(animationEnd, function() {
                    $(this).addClass('logoshake').off();
                });
        }
    };
	   var container = $("#content");
       var swipe = Swipe(container);
       visualWidth = container.width();
       visualHeight = container.height();

       // 页面滚动到指定的位置
       function scrollTo(time, proportionX) {
           var distX = visualWidth * proportionX;
           swipe.scrollTo(distX, time);
       }

       // 获取数据
       var getValue = function(className) {
           var $elem = $('' + className + '');
               //走路的路线坐标
           return {
               height: $elem.height(),
               top: $elem.position().top
           };
       };

       // 桥的Y轴
       var bridgeY = function() {
           var data = getValue('.c_background_middle');
           return data.top;
       }();  
     	    // 用来临时调整页面
/*    swipe.scrollTo(visualWidth*2, 0);*/

	 var lamp = {
            elem: $('.b_background'),
            bright: function() {
                this.elem.addClass('lamp-bright');
            },
            dark: function() {
                this.elem.removeClass('lamp-bright');
            }
        };
       var boy=BoyWalk();

		$("#sun").addClass('rotation');
		 boy.walkTo(3000,0.3)
            .then(function() {
                // 第一次走路完成
                // 开始页面滚动
                scrollTo(9000,1);
             }) 
			 .then(function(){
				 return boy.walkTo(9000, 0.5)
			 })
			  .then(function() {
			  //暂停走路
			  boy.stopWalk()
			  })
			  .then(function() {
				  // 开门
				  return openDoor();
			  })
			  .then(function() {
				  // 开灯
				  lamp.bright();
			  })
			  .then(function() {
				  // 进商店
				  return boy.toShop(2000);
			  })
			  .then(function(){
				  // 取花
				  return boy.talkFlower();
			  })
			  .then(function() {
				  // 飞鸟
				  bird.fly();
			  })
			  .then(function() {
				  // 出商店
				  return boy.outShop(2000);
			  })
			  .then(function() {
                // 第一次走路完成
                // 开始页面滚动
                scrollTo(7000,2);
               }) 
			   .then(function(){
                // 关门
                return shutDoor();
               })
			   .then(function() {
                // 灯暗
                lamp.dark();
               })
			   .then(function() {
                    // 第二次走路
                    return boy.walkTo(5000,0.15);
               })            .then(function() {
                // 第二次走路到桥上left,top
                return boy.walkTo(2500, 0.25,girl.getPosition().top/ visualHeight);
            })
            .then(function() {
                // 实际走路的比例
                var proportionX = ((girl.getPosition().left - boy.getWidth() + girl.getWidth() / 5) / visualWidth)-0.03;
                // 第三次桥上直走到小女孩面前
                return boy.walkTo(2500, proportionX);
            }).then(function() {
                // 图片还原原地停止状态
                boy.resetOriginal();
            }).then(function() {
                // 增加转身动作 
                setTimeout(function() {
                    girl.rotate();
                    boy.rotate(function() {
                        // 开始logo动画
                        logo.run();
						snowflake();
                    });
                }, 1000);
            });
   var girl = {
        elem: $('.girl'),
        getHeight: function() {
            return this.elem.height()
        },
        // 转身动作
        rotate: function() {
            this.elem.addClass('girl-rotate');
        },
        setPosition: function() {
            this.elem.css({
                left: visualWidth / 2,
                top: bridgeY - this.getHeight()
            });
        },
        getPosition: function() {
            return this.elem.position();
        },
        getWidth: function() {
            return this.elem.width();
        }
    };

    // 修正小女孩位置
    girl.setPosition();
 var snowflakeURl = [
        "img/snowflake/snowflake1.png",
        "img/snowflake/snowflake2.png",
        "img/snowflake/snowflake3.png",
        "img/snowflake/snowflake4.png",
        "img/snowflake/snowflake5.png",
        "img/snowflake/snowflake6.png"
    ]

    ///////
    //飘雪花 //
    ///////
    function snowflake() {
        // 雪花容器
        var $flakeContainer = $('#snowflake');

        // 随机六张图
        function getImagesName() {
            return snowflakeURl[[Math.floor(Math.random() * 6)]];
        }
        // 创建一个雪花元素
        function createSnowBox() {
            var url = getImagesName();
            return $('<div class="snowbox" />').css({
                'width': 41,
                'height': 41,
                'position': 'absolute',
                'backgroundSize': 'cover',
                'zIndex': 100000,
                'top': '-41px',
                'backgroundImage': 'url(' + url + ')'
            }).addClass('snowRoll');
        }
        // 开始飘花
        setInterval(function() {
            // 运动的轨迹
            var startPositionLeft = Math.random() * visualWidth - 100,
                startOpacity    = 1,
                endPositionTop  = visualHeight - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
                duration        = visualHeight * 10 + Math.random() * 5000;

            // 随机透明度，不小于0.5
            var randomStart = Math.random();
            randomStart = randomStart < 0.5 ? startOpacity : randomStart;

            // 创建一个雪花
            var $flake = createSnowBox();

            // 设计起点位置
            $flake.css({
                left: startPositionLeft,
                opacity : randomStart
            });

            // 加入到容器
            $flakeContainer.append($flake);

            // 开始执行动画
            $flake.transition({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.7
            }, duration, 'ease-out', function() {
                $(this).remove() //结束后删除
            });
            
        }, 200);
    }
	})



// 动画结束事件
       var animationEnd = (function() {
           var explorer = navigator.userAgent;
           if (~explorer.indexOf('WebKit')) {
               return 'webkitAnimationEnd';
           }
           return 'animationend';
       })();

function doorAction(left, right, time) {
        var $door = $('.door');
        var doorLeft = $('.door-left');
        var doorRight = $('.door-right');
        var defer = $.Deferred();
        var count = 2;
        // 等待开门完成
        var complete = function() {
            if (count == 1) {
                defer.resolve();
                return;
            }
            count--;
        };
        doorLeft.transition({
            'left': left
        }, time, complete);
        
        doorRight.transition({
            'left': right
        }, time, complete);
        
         return defer; 
}
	// 开门
    function openDoor() {
        return doorAction('-50%', '100%', 2000);
    }

    // 关门
    function shutDoor() {
        return doorAction('0%', '50%', 2000);
    }
    var instanceX;

    /**
     * 小孩走路
     * @param {[type]} container [description]
     */	
function BoyWalk() {
	var container = $("#content");
	// 页面可视区域
	var visualWidth = container.width();
	var visualHeight = container.height();
	/*
	var swipe = Swipe(container);
	 获取数据*/
	var getValue = function(className) {
		var $elem = $('' + className + '');
			//走路的路线坐标
		return {
			height: $elem.height(),
			top: $elem.position().top
		};
    };
	// 路的Y轴
	var pathY = function() {
		var data = getValue('.a_background_middle');
		return data.top + data.height / 2;
	}();
	var $boy = $("#boy");
	var boyWidth = $boy.width();
	var boyHeight = $boy.height();
	// 修正小男孩的正确位置
	$boy.css({
		top: pathY - boyHeight + 25
	});


////////////////////////////////////////////////////////
//===================动画处理============================ //
////////////////////////////////////////////////////////
// 暂停走路
	function pauseWalk() {
		$boy.addClass('pauseWalk');
	}
// 恢复走路
function restoreWalk() {
    $boy.removeClass('pauseWalk');
}

// css3的动作变化
function slowWalk() {
    $boy.addClass('slowWalk');
}

// 用transition做运动
function stratRun(options, runTime) {
    var dfdPlay = $.Deferred();
    // 恢复走路
    restoreWalk();
    // 运动的属性
    $boy.transition(
        options,
        runTime,
        'linear',
        function() {
			 dfdPlay.resolve();});
    return dfdPlay;
}

// 开始走路
function walkRun(time, dist, disY) {
    time = time || 3000;
    // 脚动作
    slowWalk();
    // 开始走路
    var d1 = stratRun({
        'left': dist + 'px',
        'top': disY ? disY : undefined
    }, time);
    return d1;
}
 // 走进商店
        function walkToShop(runTime) {
            var defer = $.Deferred();
            var doorObj = $('.door')
            // 门的坐标
            var offsetDoor = doorObj.offset();
            var doorOffsetLeft = offsetDoor.left;
            // 小孩当前的坐标
            var offsetBoy     = $boy.offset();
            var boyOffetLeft = offsetBoy.left;


            // 当前需要移动的坐标
            instanceX = (doorOffsetLeft + doorObj.width() / 2) - (boyOffetLeft + $boy.width() / 2);
             /*instanceX = (doorOffsetLeft + doorMiddle) - (boyPoxLeft + boyMiddle);*/
// 开始走路
          var walkPlay = stratRun({
                transform: 'translateX(' + instanceX + 'px),scale(0.3,0.3)',
            // Y的坐标
            // top = 人物底部的top - 门中间的top值
      /*      instanceY = boyPoxTop + boyHeight - doorOffsetTop + (doorTopMiddle);*/
            // 开始走路
           /* var walkPlay = stratRun({
                transform: 'translateX(' + instanceX + 'px),scale(0.3,0.3)',*/
			/*var walkPlay = stratRun({
			   transform: 'translateX(' + instanceX + 'px),translateY(-' + instanceY + 'px),scale(0.5,0.5)', */
                opacity: 0.1
            }, 2000);
            // 走路完毕
            walkPlay.done(function() {
                $boy.css({
                    opacity: 0
                })
                defer.resolve();
            })
            return defer;
        }

        // 走出店
        function walkOutShop(runTime) {
          var defer = $.Deferred();
		  restoreWalk();
		  //开始走路
		  var walkPlay = stratRun({
			  transform: 'translateX(' + instanceX + 'px),translateY(0),scale(1,1)',
			 opacity: 1
		  }, runTime);
		  //走路完毕
		  walkPlay.done(function() {
			  defer.resolve();
		  });
		  return defer;          
        }
		
		
		// 取花
        function talkFlower() {
            // 增加延时等待效果
            var defer = $.Deferred();
            setTimeout(function() {
                // 取花
                $boy.addClass('slowFlolerWalk');
                defer.resolve();
            }, 1000);
            return defer;
        }
// 计算移动距离
function calculateDist(direction, proportion) {
    return (direction == "x" ?
        visualWidth : visualHeight) * proportion;
}
return {
            // 开始走路
            walkTo: function(time, proportionX, proportionY) {
                var distX = calculateDist('x', proportionX)
                var distY = calculateDist('y', proportionY)
                return walkRun(time, distX, distY);
            },
            // 走进商店
            toShop: function() {
                return walkToShop.apply(null, arguments);
            },
            // 走出商店
            outShop: function() {
                return walkOutShop.apply(null, arguments);
            }, 
            // 停止走路
            stopWalk: function() {
                pauseWalk();
            },
            setColor: function(value) {
                $boy.css('background-color', value)
            },
			 // 取花
          /*  talkFlower: function() {
                return talkFlower();
            },*/
            // 获取男孩的宽度
            getWidth: function() {
                return $boy.width();
            },
            // 复位初始状态
            resetOriginal: function() {
                this.stopWalk();
                // 恢复图片
                $boy.removeClass('slowWalk slowFlolerWalk').addClass('boyOriginal');
            },
               // 转身动作
               rotate: function(callback) {
                   restoreWalk();
                   $boy.addClass('boy-rotate');
                   // 监听转身完毕
                   if (callback) {
                       $boy.on(animationEnd, function() {
                           callback();
                           $(this).off();
                       })
                   }
               },/*,
            setFlolerWalk:function(){
                 $boy.addClass('slowFlolerWalk');
		   },*/
               // 取花
               talkFlower: function() {
                   $boy.addClass('slowFlolerWalk');
               }	   
        }
    }




