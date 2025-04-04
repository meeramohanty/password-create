$(document).ready(function () {
    function checkStrength(password) {
      let score = 0;
      let minLength = 16; // Minimum length
      let errors = {
        length: password.length < minLength,
        uppercase: !/[A-Z]/.test(password),
        lowercase: !/[a-z]/.test(password),
        number: !/\d/.test(password),
        symbol: !/[!@#$%^&*()\-_+=\[\]{}|;:'",.<>?/]/.test(password)
      };
  
      // Update error messages and length indicator
      $("#errorLength")
        .toggleClass("validated", !errors.length)
        .text(`${Math.max(minLength - password.length, 0)} Chars`);
      $("#errorUppercase").toggleClass("validated", !errors.uppercase);
      $("#errorLowercase").toggleClass("validated", !errors.lowercase);
      $("#errorNumber").toggleClass("validated", !errors.number);
      $("#errorSymbol").toggleClass("validated", !errors.symbol);
  
      // Calculate the score based on how many requirements are met
      if (!errors.length) score += 1;
      if (!errors.uppercase) score += 1;
      if (!errors.lowercase) score += 1;
      if (!errors.number) score += 1;
      if (!errors.symbol) score += 1;
  
      // Strength text and color
      let strengthText = "";
      let color = "";
      switch (score) {
        case 5:
          strengthText = "Very Strong";
          color = "#0E9F6E";
          $("#pleaseAdd").html("<b>Perfect!</b>").css("color", "#0E9F6E"); // Show Perfect!
          break;
        case 4:
          strengthText = "Strong";
          color = "#76A9FA";
          $("#pleaseAdd").html("<b>Please Add:</b>").css("color", ""); // Reset text
          break;
        case 3:
          strengthText = "Medium";
          color = "#FACA15";
          $("#pleaseAdd").html("<b>Please Add:</b>").css("color", ""); // Reset text
          break;
        case 2:
          strengthText = "Weak";
          color = "#F05252";
          $("#pleaseAdd").html("<b>Please Add:</b>").css("color", ""); // Reset text
          break;
        default:
          strengthText = "Very Weak";
          color = "#C81E1E";
          $("#pleaseAdd").html("<b>Please Add:</b>").css("color", ""); // Reset text
      }
  
      // Update the strength bar and text
      $(".strength-bar")
        .css("width", score * 20 + "%")
        .css("background", color);
      $("#strengthText").text(strengthText).css("color", color);
    }
  
    function generatePassword() {
      let length = $("#passwordLength").val() || 16; // Default length is 16
      let uppercase = $("#includeUppercase").is(":checked");
      let lowercase = $("#includeLowercase").is(":checked");
      let numbers = $("#includeNumbers").is(":checked");
      let symbols = $("#includeSymbols").is(":checked");
  
      let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let lowerChars = "abcdefghijklmnopqrstuvwxyz";
      let numberChars = "0123456789";
      let symbolChars = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/";
  
      let allChars = "";
      let password = "";
  
      if (uppercase) {
        allChars += upperChars;
        password += upperChars[Math.floor(Math.random() * upperChars.length)];
      }
      if (lowercase) {
        allChars += lowerChars;
        password += lowerChars[Math.floor(Math.random() * lowerChars.length)];
      }
      if (numbers) {
        allChars += numberChars;
        password += numberChars[Math.floor(Math.random() * numberChars.length)];
      }
      if (symbols) {
        allChars += symbolChars;
        password += symbolChars[Math.floor(Math.random() * symbolChars.length)];
      }
  
      for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
      }
  
      return password
        .split("")
        .sort(() => 0.5 - Math.random())
        .join("");
    }
  
    $("#generateBtn").click(function () {
      let password = generatePassword();
      $("#passwordInput").val(password);
      checkStrength(password);
    });
  
    $("#passwordInput").on("input", function () {
      checkStrength($(this).val());
    });
  
    $("#togglePassword").click(function () {
      $(this).find(".material-symbols-rounded").toggle();
      let type =
        $("#passwordInput").attr("type") === "password" ? "text" : "password";
      $("#passwordInput").attr("type", type);
    });
  
    $("#tipsBtn").click(function () {
      new bootstrap.Modal(document.getElementById("tipsModal")).show();
    });
  
    $("#copyBtn").click(function () {
      var password = $("#passwordInput").val();
      navigator.clipboard
        .writeText(password)
        .then(function () {
          // Show Bootstrap Toast instead of alert
          $("#copyToast").toast("show");
        })
        .catch(function (err) {
          console.error("Failed to copy: ", err);
        });
    });
  });
  
  