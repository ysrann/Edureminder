const reminderTimeInput = document.getElementById('reminder-time');
const setReminderBtn = document.getElementById('set-reminder-btn');
const reminderMsg = document.getElementById('reminder-msg');

function showNotification(message) {
  if(Notification.permission === 'granted') {
    new Notification('Edureminder', { body: message });
  }
}

setReminderBtn.onclick = () => {
  if(!('Notification' in window)) {
    reminderMsg.textContent = 'Browser Anda tidak mendukung notifikasi.';
    return;
  }

  if(Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      if(permission !== 'granted') {
        reminderMsg.textContent = 'Izinkan notifikasi untuk mengaktifkan reminder.';
      }
    });
  }

  const timeStr = reminderTimeInput.value;
  if(!timeStr) {
    reminderMsg.textContent = 'Pilih waktu reminder terlebih dahulu.';
    return;
  }

  reminderMsg.textContent = `Reminder disetel pada jam ${timeStr}.`;
  scheduleDailyNotification(timeStr);
};

function scheduleDailyNotification(timeStr) {
  // Simpel: Cek setiap menit, kalau waktu sama, munculkan notif
  if(window.reminderInterval) clearInterval(window.reminderInterval);

  window.reminderInterval = setInterval(() => {
    const now = new Date();
    const [h, m] = timeStr.split(':').map(Number);
    if(now.getHours() === h && now.getMinutes() === m) {
      showNotification("Waktunya belajar! Jangan lupa semangat ya! 💪");
    }
  }, 60000);
}
