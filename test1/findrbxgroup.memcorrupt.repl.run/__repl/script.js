grecaptcha.ready(function() {
  grecaptcha
    .execute("6Lc7fZQUAAAAAIXMD8AonuuleBX0P3hS2XW364Ms", {
      action: "replrun"
    })
    .then(function(captcha) {
      let parts = window.location.hostname.split(/\./).slice(0, 2);
      if (window.location.hostname === "repl.run") {
        parts = ["blinkenlights", "turbio"];
      }

      let url =
        "https://repl.it/data/repls/@" +
        parts[1] +
        "/" +
        parts[0] +
        "/gen_repl_run_token";
      return fetch(url, {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "post",
        body: "captcha=" + captcha
      }).then(res => res.json());
    })
    .then(
      token => {
        const { sourceRepl } = JSON.parse(atob(atob(token).split(":")[0]));
        window.location.href = "https://repl.it/replid/" + sourceRepl;
      },
      e => {
        document.body.textContent = "couldn't find repl :(";
      }
    );
});
