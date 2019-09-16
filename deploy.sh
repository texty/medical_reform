#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка
npm run build

# переход в каталог сборки
cd dist

# если вы публикуете на пользовательский домен
# echo 'www.example.com' > CNAME


git init
git add -A
git commit -m "deployed at `date`"

# если вы публикуете по адресу https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# если вы публикуете по адресу https://<USERNAME>.github.io/<REPO>

# для того, щоб працювати
# git push -f git@github.com:ptrBodnar/medical_reform.git master

# для того, щоб показати
git push  -f git@github.com:texty/medical_reform.git master:gh-pages

cd -
