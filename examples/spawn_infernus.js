// Этот путь ниже предполагает, что файл скрипта находится в каталоге CLEO. Отрегулируйте в соответствии с вашими настройками.
/// <reference path=".config/gta3.d.ts" />

/**
 * Этот скрипт создаёт Infernus перед игроком.
 * При нажатии кнопки F5.
 */
var VK_F5 = 116;
var MI_INFERNUS = getInfernusMI();
var player = new Player(0);

while (true) {
  wait(250);
  if (Pad.IsKeyPressed(VK_F5) && player.isPlaying()) {
    loadModel(MI_INFERNUS);

    var pos = addVec(player.getChar().getCoordinates(), { x: 2.0, y: -2.0, z: 0 });
    var infernus = Car.Create(MI_INFERNUS, pos.x, pos.y, pos.z);
    var blip = Blip.AddForCar(infernus);

    showTextBox("Here is your Infernus");
    infernus.markAsNoLongerNeeded();
    Streaming.MarkModelAsNoLongerNeeded(MI_INFERNUS);

    wait(2000);
  }
}

function loadModel(mi) {
  Streaming.RequestModel(mi);

  while (!Streaming.HasModelLoaded(mi)) {
    wait(250);
  }
}

function addVec(v1, v2) {
  return { x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z };
}

function getInfernusMI() {
  switch (GAME) {
    case "re3":
    case "gta3":
      return 101;
    case "reVC":
    case "vc":
      return 141;
    case "sa":
      return 411;
  }
}
