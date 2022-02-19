# CLEO Redux

[![Discord](https://img.shields.io/discord/911487285990674473?style=for-the-badge)](https://discord.gg/d5dZSfgBZr)
[![YouTube Channel](https://img.shields.io/badge/YouTube-Channel-FF0000?style=for-the-badge)](https://www.youtube.com/playlist?list=PLNxQuEFtVkeizoLEQiok7qzr1f0mcwfFb)

- [Начало](#начало)
	- [Что такое CLEO Redux?]
	- [Поддерживаемые языки]
	- [Поддерживаемые релизы]
	- [Отношение к CLEO Library]
		- [Запуск CLEO Redux как отдельного ПО]
		- [Запуск CLEO Redux в качестве дополнения к библиотеке CLEO]

- [Установка]
	- [Первичная настройка]
	- [Совместимость с re3 и reVC]
	- [Совместимость с The Trilogy: The Definitive Edition]
	- [Удаление]

- [Конфигурация]
	- [Общая конфигурация]
	- [Разрешения]
		- [Все]
		- [Слабые]
		- [Строгие]
		- [Исключения]

- [Лог]
	- [Пользовательские сценарии]
		- [Добавление нового скрипта]
		- [Удаление скрипта]
		- [Пользовательские команды]
		- [Написание CS-скриптов]
		- [Написание JS-скриптов]
		- [Интеграция с кодом Visual Studio]

- [Поддержка JavaScript]
	- [Предварительное условие]
	- [Жизненный цикл скрипта]
	- [Собственные команды]
		- [Объект класса Script против объекта]
		- [Мат. классы]
		- [Свободный интерфейс]
		- [Примеры]
	- [Импорт]
	- [Пользовательские привязки]
	- [Устаревший]

- [Пользовательский текст]

- [Особенности разработки]
	- [Лог SCM]
	- [Горячая перезагрузка]

- [Лицензия]

## Начало

### Что такое CLEO Redux?

CLEO Redux — это среда выполнения сценариев для игр эпохи GTA 3D. Это полноценный член семейства CLEO, который предоставляет знакомый опыт всем, кто использовал библиотеку CLEO для классической GTA San Andreas или ее повторные реализации для других игр. Основная цель CLEO — предоставить возможность легко настраивать игру с помощью многочисленных пользовательских скриптов.

Если вы новичок в CLEO, посетите [официальный сайт] (https://cleo.li/), чтобы найти больше информации об этом.

### Поддерживаемые языки

CLEO Redux поддерживает скомпилированные бинарные скрипты (`*.cs`) в родном формате SCM и простые текстовые скрипты (`*.js`), написанные на JavaScript.

CLEO Redux ориентируется на JavaScript как на основной язык для пользовательских скриптов. JavaScript — популярный язык программирования с богатой экосистемой и большим количеством доступной информации. Он свободен от ограничений и ловушек языка SCM, таких как отсутствие поддержки функций, массивов или малое количество переменных.

### Поддерживаемые релизы

Классические:

- GTA III 1.0
- GTA Vice City 1.0
- GTA San Andreas 1.0 (только с [CLEO 4.4](https://github.com/cleolibrary/CLEO4))

Ремастеры (The Trilogy):

- GTA III 1.0.0.14718
- GTA Vice City 1.0.0.14718
- San Andreas 1.0.0.14296, 1.0.0.14388, 1.0.0.14718 (Название обновления 1.03)

Подробнее см. [Часто задаваемые вопросы по окончательному изданию] (the-finitive-edition-faq.md).
