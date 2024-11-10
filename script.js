window.onload = function () {
  const text = document.getElementById("flyingText");
  const tryMeButton = document.getElementById("tryMe");
  const image = document.querySelector(".main-image");

  // 点“点我试试”触发的信息效果
  tryMeButton.onclick = () => {
    for (let i = 0; i < 20; i++) {
      createMessage();
    }
  };

  // 创建随机消息
  function createMessage() {
    const message = document.createElement("div");
    message.className = "message";
    message.textContent = "刀剑无眼，小心伤了姑娘";

    // 随机设置位置和动画延时
    message.style.left = `${Math.random() * window.innerWidth}px`;
    message.style.top = `${Math.random() * window.innerHeight}px`;
    message.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
    message.style.color = getRandomColor();

    document.body.appendChild(message);

    // 保持在页面上，不消失
  }

  // 随机生成颜色
  function getRandomColor() {
    const colors = ["#ff4500", "#1e90ff", "#32cd32", "#ff69b4", "#ffa500"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // 酸奶块动画完成后开始移动并反弹
  text.addEventListener("animationend", function () {
    let xSpeed = 2;
    let ySpeed = 2;
    let textRect = text.getBoundingClientRect();
    let imageRect = image.getBoundingClientRect();

    function moveAndBounce() {
      let newLeft = text.offsetLeft + xSpeed;
      let newTop = text.offsetTop + ySpeed;

      if (
        newLeft + textRect.width >= imageRect.left &&
        newLeft <= imageRect.right &&
        newTop + textRect.height >= imageRect.top &&
        newTop <= imageRect.bottom
      ) {
        if (newLeft <= imageRect.left || newLeft + textRect.width >= imageRect.right) {
          xSpeed = -xSpeed;
        }
        if (newTop <= imageRect.top || newTop + textRect.height >= imageRect.bottom) {
          ySpeed = -ySpeed;
        }
      } else {
        if (newLeft < 0) {
          newLeft = 0;
          xSpeed = -xSpeed;
        } else if (newLeft + textRect.width > window.innerWidth) {
          newLeft = window.innerWidth - textRect.width;
          xSpeed = -xSpeed;
        }
        if (newTop < 0) {
          newTop = 0;
          ySpeed = -ySpeed;
        } else if (newTop + textRect.height > window.innerHeight) {
          newTop = window.innerHeight - textRect.height;
          ySpeed = -ySpeed;
        }
      }

      text.style.left = newLeft + "px";
      text.style.top = newTop + "px";

      requestAnimationFrame(moveAndBounce);
    }

    moveAndBounce();
  });
};