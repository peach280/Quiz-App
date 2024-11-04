from flask import Flask,request,jsonify,render_template
from flask_cors import CORS
import sqlite3
import hashlib
from Questions import questions

app = Flask(__name__)
CORS(app)
DATABASE = "data.db"
def create_table():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )
       
    ''')
   
def get_db():
    db=sqlite3.connect(DATABASE)
    db.row_factory=sqlite3.Row
    return db   

def create_ques():
    db1=get_db()
    cursor=db1.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Ques(
        id TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        genre TEXT NOT NULL,
        ques TEXT PRIMARY KEY NOT NULL,
        options TEXT NOT NULL,
        answer TEXT NOT NULL
    )
''')
    
    
    db1.commit()
    db1.close()
def create_score():
    db1=get_db()
    cursor=db1.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Score(
        username TEXT NOT NULL,   
        points INTEGER DEFAULT 0,
        genre TEXT NOT NULL
    )
    
''')

    






create_table()
create_ques()
create_score()
def Ques():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT ques FROM Ques")
    prev_questions = cursor.fetchall()
    for ques in questions:
        
        if ques['name'] not in [row[0] for row in prev_questions]:
            cursor.execute('''INSERT OR REPLACE INTO Ques (genre,ques,options,answer) VALUES(?,?,?,?)''',
                           (ques["genre"],ques["name"], ",".join(ques["options"]), ques["answer"]))
    db.commit()
    db.close()

@app.route('/register',methods=['POST'])
def register():
    data = request.get_json()
    
    name = data.get('username')
    email = data.get('email')
    password = data.get('password')
    if not name or not email or not password :
        return jsonify({'error':'Name and email are required'}),400
    db=get_db()
    cursor=db.cursor()
    cursor.execute('SELECT * FROM users WHERE username=?',(name,))
    existence = cursor.fetchone()
    
    if existence:
        return {'message':'This username is not available'}
    db.commit()
    db.close()
    if not existence:
        try:
            hashed_password=hashlib.sha256(password.encode()).hexdigest()
            db=get_db()
            cursor=db.cursor()
            cursor.execute('INSERT INTO users (username,email,password) VALUES (?,?,?)',(name,email,hashed_password))
            cursor.execute('SELECT * FROM users WHERE username=?',(name,))
            user=cursor.fetchone()
            db.commit()
            db.close()
            return {'message':'Data Submitted Successfully','id':user['username']},200
        except Exception as  e:
            return {'error':str(e)},500
@app.route('/login',methods=['POST'])
def login():
    req=request.get_json()
    username = req.get('username')
    password = req.get('password')
    if not username or not password:
        return {'error':'Please enter the username and password'},400
    try:
        db=get_db()
        cursor=db.cursor()
        cursor.execute('SELECT * FROM users WHERE username=?',(username,))
        user=cursor.fetchone()
        db.close()
        if user:
            hashed_password=hashlib.sha256(password.encode()).hexdigest()
            if(hashed_password==user['password']):
                return {'id':user['username'],'message':'Login successful','number':user['id']},200
        return {'error':'Invalid username or password'},401
    except Exception as e:
        return {'error':str(e)},500
@app.route('/admin',methods=['POST'])
def admin():
    data=request.get_json()
    id=data.get('id')
    if(id==16):
        return jsonify({'message':'You are admin'})
    else:
        return jsonify({'message':'You are not the admin'}),401
@app.route('/Data',methods=['GET'])
def Data():
    genre = request.args.get('genre')
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM Ques WHERE genre=?', (genre,))
    rows = cursor.fetchall()
    db.close()
    return jsonify([dict(row) for row in rows])

@app.route('/addQues',methods=['POST'])
def addQues():
    try:
        data=request.get_json()
        genre = data.get("genre")
        print(genre)
        name=data.get("name")
        options = data.get("options")
        answer = data.get("answer")

        db = get_db()
        cursor = db.cursor()
        cursor.execute('INSERT INTO Ques (genre, ques, options, answer) VALUES (?, ?, ?, ?)',
                        (genre, name, options, answer))
        db.commit()
        db.close()

        return jsonify({'message': 'Question added successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route("/dlt",methods = ['POST'])
def delete():
    try:
        data=request.get_json()
        name = data.get("name")
        db=get_db()
        cursor=db.cursor()
        cursor.execute('DELETE FROM Ques WHERE ques=?',(name,))
        db.commit()
        db.close()
        return jsonify({'message':'Question deleted successfully'}),200
    except Exception as e:
        return jsonify({'error':str(e)}),500

@app.route("/change",methods=['POST'])
def change():
    data=request.get_json()
    name=data.get("name")
    answer=data.get("answer")
    db=get_db()
    cursor=db.cursor()
    cursor.execute('SELECT * FROM Ques WHERE ques=?',(name,))
    row=cursor.fetchone()
    print(row)
    try:
        cursor.execute('UPDATE Ques SET answer=? WHERE ques=?', ( answer, name,))
        db.commit()
        db.close()
        return jsonify({'message': 'done'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route("/getPoints",methods=['POST'])

def getPoints():
    try:
        data = request.get_json()
        username = data.get('username')
        new_score = data.get('total')
        print(new_score)
        genre = data.get('genre')
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''SELECT * FROM Score WHERE username=? AND genre=?''',(username,genre,))
        existing_user=cursor.fetchone()
        if existing_user:
            cursor.execute('UPDATE Score SET points=? WHERE username=? AND genre=?',(new_score,username,genre,))
        else:
            cursor.execute('''INSERT INTO Score (username,points,genre) VALUES (?,?,?)'''
                           ,(username,new_score,genre,))
        db.commit()
        db.close()
        
        return jsonify({'message': 'Score updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route('/lb',methods=['GET'])
def lb():
    genre = request.args.get('genre')
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM Score WHERE genre=? ORDER BY points DESC', (genre,))
    rows = cursor.fetchall()
    db.close()
    return jsonify([dict(row) for row in rows])
@app.route('/pp',methods=['GET'])
def pp():
    username = request.args.get('username')
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM Score WHERE username=?', (username,))
    rows = cursor.fetchall()
    db.close()
    return jsonify([dict(row) for row in rows])
if __name__=='__main__':
    app.run(debug=True)

