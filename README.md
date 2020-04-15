# Tanakh

В данном web приложении представлен простейший пример транспонирования подгрупп 
массива данных с помощью SQL. =)

Для наглядности и простоты кода
- Шкала времени сделана статической и прибита гвоздями (hard coded).
- Не использованы временные таблицы, индексы и прочие нормальные вещи.

## Сборка и запуск

Бэкенд написан на Go + Gin/SqlX.
Для компиляции небходим Golang 1.13+ (ниже версии не проверял)

    git clone https://github.com/sadsoldier/tanakh
    cd tanakh
    ./configure --prefix=/usr
    make install
    tanakh

Или отладочная сборка  без инсталяции 
(development mode with only local directories usage)

    ./configure --enable-devel-mode
    make clean
    make
    ./tanakh --f=true -debug=true -devel=true

Приложение доступно по порту 7007

## Результат сборки включает

- Executable file `tanakh` with enbedded Angular frontend (CSS/HTML/JS)
- Database tanakh.db

