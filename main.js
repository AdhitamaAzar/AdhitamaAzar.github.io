var typed = new Typed(".text", {
    strings: ["Computer Science Student", "Frontend Developer", "Web Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

      const scriptURL = 'https://script.google.com/macros/s/AKfycby8fbIPeQTXsF7QOVfgQlqNWXkloX8wt2nTrmaf4GnS403qNVfxXy7q-ygfWv5JSl82/exec';
      const form = document.forms['Database-Portfolio'];
      const btnKirim = document.querySelector('.btn-kirim');
      const btnLoading = document.querySelector('.btn-loading');
      const myAlert = document.querySelector('.my-alert');

      form.addEventListener('submit', e => {
        e.preventDefault();
        btnLoading.classList.remove('d-none');
        btnKirim.classList.add('d-none');
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
          .then(response => {
            btnLoading.classList.add('d-none');
            btnKirim.classList.remove('d-none');
            myAlert.style.display = 'block';
            form.reset();
            setTimeout(() => myAlert.style.display = 'none', 5000);
          })
          .catch(error => console.error('Error!', error.message));
      });