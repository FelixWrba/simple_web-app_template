document.querySelectorAll('.btn, .ripple').forEach(btn =>
  btn.addEventListener('click', e => {
      const ripple = document.createElement('span');
      const rippleSize = btn.getBoundingClientRect().width * 3;
      const target = (e.target.classList.contains('btn') || e.target.classList.contains('ripple'))
      ? e.target :
      e.target.offsetParent;
      console.log(target)
      target.appendChild(ripple);
      ripple.style.left = e.pageX -target.offsetLeft + 'px';
      ripple.style.top = e.pageY -target.offsetTop + 'px';
      ripple.style.width = rippleSize + 'px';
      ripple.style.height = rippleSize + 'px';
      setTimeout(() => target.removeChild(ripple), 1000);
  })
);
