/// <reference path=".config/gta3.d.ts" />
// Селектор скинов игрока, используйте [ and ] для переключения между различными моделями.
// Оригинальный сценарий от DK22Pac: https://sannybuilder.com/forums/viewtopic.php?id=1177
// Версия для re3 от Seemann: https://github.com/x87

if (GAME !== "re3") {
  exit("This script is only for re3");
}

var setModelIndex = Memory.Translate("CPed::SetModelIndex");
if (!setModelIndex) {
  exit("Can't find address for CPed::SetModelIndex");
}

var getPed = Memory.Translate("CPools::GetPed");
if (!getPed) {
  exit("Can't find address for CPools::GetPed");
}

var index = 0;
var player = new Player(0);
var skins = setupSkinIds();

// Основной цикл.
while (true) {
  wait(250);
  if (player.isPlaying()) {
    if (checkKeyReleased(219)) { // [
      changeSkin(prevSkin());
    } else if (checkKeyReleased(221)) { // ]
      changeSkin(nextSkin());
    }
  }
}

// инициализуем разрешенные модели педов (пропускаем модели 26, 27, 28, 29).
function setupSkinIds() {
  var ids = [];
  for (var i = 0; i < 83; i++) {
    if (i >= 26 && i <= 29) {
      continue;
    }
    ids.push(i);
  }
  return ids;
}

// Получаем следующий идентификатор в массиве скинов.
function nextSkin() {
  if (++index >= skins.length) {
    index = 0;
  }
  return skins[index];
}

// Получаем предыдущий идентификатор в массиве скинов.
function prevSkin() {
  if (--index < 0) {
    index = skins.length - 1;
  }
  return skins[index];
}

// Проверяем, перестал ли игрок нажимать клавишу.
function checkKeyReleased(key) {
  if (Pad.IsKeyPressed(key)) {
    while (Pad.IsKeyPressed(key)) {
      if (!player.isPlaying()) {
        return false;
      }
      wait(0);
    }
    return true;
  }
  return false;
}

// Загружаем модель с индексом mi и изменяем модель игрока.
function changeSkin(mi) {
  if (!Streaming.HasModelLoaded(mi)) {
    Streaming.RequestModel(mi);

    while (!Streaming.HasModelLoaded(mi)) {
      if (!player.isPlaying()) {
        return;
      }
      wait(0);
    }
  }

  var struct = Memory.Fn.Cdecl(getPed)(player.getChar()); // Аналогично 0A96 GET_PED_POINTER

  Memory.Fn.Thiscall(setModelIndex, struct)(mi); // Аналогично 0AA6: call_method address setModelIndex struct struct num_params 1 pop 0 func_params mi

  Streaming.MarkModelAsNoLongerNeeded(mi);
}
