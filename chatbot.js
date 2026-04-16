const btn = document.getElementById("chat-btn");
const box = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const messages = document.getElementById("messages");

btn.onclick = () => box.classList.toggle("hidden");

input.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const userText = input.value.trim();
    if (!userText) return;

    messages.innerHTML += `<div><b>You:</b> ${userText}</div>`;
    input.value = "";

    // show typing
    const typingDiv = document.createElement("div");
    typingDiv.innerHTML = "<b>Bot:</b> typing...";
    messages.appendChild(typingDiv);

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userText
        })
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "No reply";

      typingDiv.innerHTML = `<b>Bot:</b> ${reply}`;
    } catch (err) {
      typingDiv.innerHTML = `<b>Bot:</b> Error connecting to server`;
      console.error(err);
    }
  }
});
