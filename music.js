// ===== 배경음악 시스템 =====

const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");

let musicEnabled =
  localStorage.getItem("musicEnabled") === "true";

bgm.volume = 0.4;

// 모바일 자동재생 제한 때문에
// 첫 클릭 이후 재생되게 함
document.body.addEventListener("click", initMusic, {
  once: true
});

function initMusic() {
  if (musicEnabled) {
    bgm.play();
    musicBtn.textContent = "🎵 MUSIC: ON";
  }
}

musicBtn.addEventListener("click", () => {

  musicEnabled = !musicEnabled;

  localStorage.setItem(
    "musicEnabled",
    musicEnabled
  );

  if (musicEnabled) {
    bgm.play();
    musicBtn.textContent = "🎵 MUSIC: ON";
  } else {
    bgm.pause();
    musicBtn.textContent = "🎵 MUSIC: OFF";
  }
});
