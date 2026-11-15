# Запрос(ы) для вставки данных минимум о двух книгах в коллекцию books

db.books.insertMany(
   [     {
        "id": "36922f5d-ef57-419d-91cf-054909bb6d32",
        "title": "Заглавие1",
        "description": "Книга по теме1",
        "authors": "Иванов И.И., Петров П.П.",
        "favorite": "",
        "fileCover": "https://images.eksmo.ru/images/covers_01_min.jpg",
        "fileName": "",
        "fileBook": ""
    },
    {
        "id": "ecb392f9-ad98-4966-9110-e3bc565753a0",
        "title": "Заглавие2",
        "description": "Книга по теме2",
        "authors": "Иванов И.И., Петров П.П.",
        "favorite": "",
        "fileCover": "https://images.eksmo.ru/images/covers_01_min.jpg",
        "fileName": "",
        "fileBook": ""
    }],
   {
      ordered: false
   }
)
# Запрос для поиска полей документов коллекции books по полю title

db.books.find(
    {"title": "Заглавие1"}
)

# Запрос для редактирования полей: description и authors коллекции books по _id записи

db.books.updateOne(
   {"_id": ObjectId("653a1b2c4d5e6f7a8b9c0d1e")},
{$set: {       "description": "Книга по теме1",
        "authors": "Иванов И.И., Петров П.П."}}
)