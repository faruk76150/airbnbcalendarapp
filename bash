cd airbnb-calendar-app-nextjs
npm run build
touch out/.nojekyll
git init
git remote add origin https://github.com/faruk76150/airbnbcalendarapp
git checkout -b gh-pages
git add out/
git commit -m "Initial deployment"
git push -u origin gh-pages
