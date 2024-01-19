

var timeout;

/*particlesJS("particles", {
  particles: {
      number: {
          value: 100,
          density: {
              enable: true,
              value_area: 800
          }
      },
      color: {
          value: "#ffffff"
      },
      shape: {
          type: "circle",
          stroke: {
              width: 0,
              color: "#000000"
          }
      },
      opacity: {
          value: 0.8,
          random: true,
          animation: {
              enable: true,
              speed: 1,
              opacity_min: 0,
              sync: false
          }
      },
      size: {
          value: 3,
          random: true
      },
      line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1
      },
      move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: true,
      }
  },
  interactivity: {
      detectsOn: "canvas",
      events: {
          onHover: {
              enable: true,
              mode: "push"
          },
          onClick: {
              enable: true,
              mode: "push"
          },
          resize: true
      },
      modes: {
          repulse: {
              distance: 100,
              duration: 0.4
          },
          push: {
              particles_nb: 4
          }
      }
  },
  
});*/

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var t1 = gsap.timeline();

  t1.from("#nav", {        /* yahan pe header ko animate kar rahe hai
    wo header thoda dheere se appear ho raha hai.  ".from" ka matlab hai neeche se upar aayega*/
    y: '-10',
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })

    .to(".boundingelem", {        /* yahan pe header ko animate kar rahe hai
    wo header thoda dheere se appear ho raha hai.  ".to" ka matlab hai neeche se upar aayega*/
      y: 0,
      duration: 2,  /*2 sec ke andar sab bounding element aa jaaye.*/
      ease: Expo.easeInOut,
      delay: 1.9,
      stagger: 0.2, /*sab bounding element ek ke baad ek appear ho 
      that's why we are using stagger*/
    })

    .from("#footer", {        /* yahan pe header ko animate kar rahe hai
    wo header thoda dheere se appear ho raha hai.  ".to" ka matlab hai neeche se upar aayega*/
      y: -10,
      opacity: 0,
      duration: 2,  /*2 sec ke andar sab bounding element aa jaaye.*/
      delay: -1,
      ease: Expo.easeInOut,

    });
}

/*jab hum mouse move kare to minicircle thoda chepta ho jaaye.
fto hame minimum chepta and maximum chepta define krna hoga aur jab mouse move band ho jaaye to chepta hat jaaye*/


function circlecheptakaro() {
  // define default scale value
  var xscale = 1;
  var yscale = 1;


  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", function (dets) {

    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

   circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector("#minicircle").style.
      transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}
circlecheptakaro();
circleMouseFollower();
firstPageAnim();

/* wo jo pic aa raha hai aur gayab ho raha hai uska logic:
teeno element ko select karo uske baad teeno me mouse move lagao
jab mouse move ho tab ye pata karo ki mouse kahan par hai i.e mouse ka x and y position pata karo
ab x and y ke corresponding  picture lagao and mouse move krte waqt 
picture rotate ho ,jaise jaise mouse tez chale waise hi rotation
bhi tez ho jaaye*/

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate=0;
  var diffrot=0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
    duration:0.5,
    });
  });


  elem.addEventListener("mousemove", function (dets) {
    diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot=dets.clientX-rotate; 
    rotate=dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate:gsap.utils.clamp(-20,20,diffrot),
    });
  });
});



// Function to update the current year and insert the copyright sign
function updateCurrentYearWithCopyright() {
  const currentYear = new Date().getFullYear();
  const copyrightYearElement = document.getElementById("copyright-year");
  copyrightYearElement.textContent = currentYear;
}

// Function to update the current time
function updateCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const timeString = `${hours}:${minutes}`;
  document.getElementById("current-time").textContent = timeString;
}


// Update the current year and insert the copyright sign initially
updateCurrentYearWithCopyright();
updateCurrentTime();

// Update the current time every minute
setInterval(updateCurrentTime, 60000); // 60000 milliseconds = 1 minute

