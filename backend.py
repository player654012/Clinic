from fastapi import FastAPI,Request
from sqlalchemy import create_engine,text
#from examples.performance import Profiler
from sqlalchemy import Integer, Column, create_engine, ForeignKey,select
from sqlalchemy.orm import relationship, joinedload, subqueryload, Session
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
import pymysql




##################################
##connect to MySQL
##################################
engine = create_engine("mysql+pymysql://root:123456@localhost/Clinic", echo=True, future=True)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



##################################
##define class for user and reminder 
##################################
class User(BaseModel):
    email: str
    #description: Optional[str] = None
    password: str
    #tax: Optional[float] = None
    class Config:
        orm_mode = True

class Reminder(BaseModel):
    Demail: str
    Pemail: str
    duration: int
    text: str
    priority:int
    #tax: Optional[float] = None
    #description: Optional[str] = None
    class Config:
        orm_mode = True



##################################
##get all patients' email and name
##################################
@app.get("/get_patient")
async def get_patient():
    with Session(engine) as session:
        session.begin()
        try:
            number=session.execute(text("SELECT count(*)FROM PatientsInf"))
            result=session.execute(text("SELECT email as value,concat(First_name,' ',Last_name) as label FROM PatientsInf"))
        except:
            session.rollback()
            raise
        else:
            session.commit()

    sendback={}
    sendback['content']=[]
    for row in result:
        remind=dict(row)
        
        rowdic={}
        sendback['content'].append(remind)
    #sendback['count']=number
    print(sendback,number)
    return sendback







##################################
##get reminders for the patient
##################################
@app.get("/email={email}")
#global maxReminderID
# maxReminderID=0
async def root(email):
    print("___________-emial:",email)
    with Session(engine) as session:
        session.begin()
        try:
            result=session.execute(text("SELECT id,Remind_text,  TIMESTAMPDIFF(second,NOW(),DATE_ADD(creat_time,INTERVAL duration HOUR)) as duration,states,P_email as email,expired FROM Reminder having email=\'{}\'  order by id ".format(email)))
        except:
            session.rollback()
            raise
        else:
            session.commit()

    sendback={}
    sendback['content']=[]
    for row in result:
        remind=dict(row)
        # maxReminderID=max(maxReminderID,remind['id'])
        # if maxReminderID<remind['id']:
        #     sendback['content'].append(dict(row))
        #     maxReminderID=remind['id']
        rowdic={}
        #rowdic["id"]=row[0]
        sendback['content'].append(remind)
    print(sendback)
    return sendback






##################################
##validate email and password for the patient
##################################
@app.post("/login")
async def login_va(user:User):
    print("get json:",user)

    with Session(engine) as session:
        session.begin()
        try:
            result=session.execute(text("SELECT ppassword,email FROM PatientsInf where email= \'"+user.email+"\'"))
        except:
            result=False
            session.rollback()
            raise
        else:
            session.commit()
            sendback={}
            sendback['login']=[]
            for row in result:
                sendback['login'].append(dict(row))
            print(sendback)

        print ("********",result)
        #print(sendback['login'][0]['ppassword'])
    if sendback['login']==[]:
        print("sendback['login']==[]")
        return {'login':False}

    if result!=False:
        if sendback['login'][0]['ppassword']==user.password:
            print(sendback['login'][0]['ppassword'],user.password,'login:True')
            return {'login':True}
        else:
            print(sendback['login'][0]['ppassword'],user.password,'Your password is wrong!')
            return {'login':False}
    else:
        print(sendback['login'][0]['ppassword'],user.password,'Your email is wrong!')
        return {'login':False}
    #if user.email
    #return sendback


##################################
##validate email and password for the Doctor
##################################
@app.post("/Dlogin")
async def login_Doctor(doctor:User):
    print("get json:",doctor)

    with Session(engine) as session:
        session.begin()
        try:
            result=session.execute(text("SELECT dpassword,email FROM DoctorInf where email= \'"+doctor.email+"\'"))
        except:
            result=False
            session.rollback()
            raise
        else:
            session.commit()
            sendback={}
            sendback['login']=[]
            for row in result:
                sendback['login'].append(dict(row))
            print(sendback)

        print ("********",result)
        #print(sendback['login'][0]['ppassword'])
    if sendback['login']==[]:
        print("sendback['login']==[]")
        return {'login':False}

    if result!=False:
        if sendback['login'][0]['dpassword']==doctor.password:
            print(sendback['login'][0]['dpassword'],doctor.password,'login:True')
            return {'login':True}
        else:
            print(sendback['login'][0]['dpassword'],doctor.password,'Your password is wrong!')
            return {'login':False}
    else:
        print(sendback['login'][0]['dpassword'],doctor.password,'Your email is wrong!')
        return {'login':False}




##################################
##reminder expired
##################################
@app.get("/expired/id={id}")
#global maxReminderID
# maxReminderID=0
async def expired(id):
    print("&&&&&&&&&&&&&&&&&&expired")
    with Session(engine) as session:
        session.begin()
        try:
            result=session.execute(text("update Reminder set expired=1 where id= "+id))
            print("success")
        except:
            result=False
            session.rollback()
            raise
        else:
            session.commit()
            return "success"
            # sendback={}
            # sendback['login']=[]
            # for row in result:
            #     sendback['login'].append(dict(row))
            # print(sendback)
    return result


##################################
##reminder completed
##################################
@app.get("/completed/id={id}")
#global maxReminderID
# maxReminderID=0
async def completed(id):
    print("&&&&&&&&&&&&&&&&&&completed")
    with Session(engine) as session:
        session.begin()
        try:
            result=session.execute(text("update Reminder set states='competed' where id= "+id))
            print("success")
        except:
            result=False
            session.rollback()
            raise
        else:
            session.commit()
            return "success"
            # sendback={}
            # sendback['login']=[]
            # for row in result:
            #     sendback['login'].append(dict(row))
            # print(sendback)
    return result

##################################
##get all patients' email and name
##################################
@app.post("/add_reminder")
async def add_reminder(reminder:Reminder):
    print("get json:",reminder)

    with Session(engine) as session:
        session.begin()
        try:
            result=session.execute(text
                ("insert INTO Reminder values (null,'{}','{}','{}',CURRENT_TIMESTAMP,{},{},'Not competed',False)"
                    .format(reminder.text,reminder.Demail,reminder.Pemail,reminder.duration,reminder.priority)))
        except:
            result=False
            session.rollback()
            raise
            return False
        else:
            session.commit()
            return True

        print ("********",result)
    

##################################
##get data for ReminderList
##################################
@app.get("/reminder_count/email={email}")
async def reminder_count(email):
    print("get json:",email)

    with Session(engine) as session:
        session.begin()
        try:
            pair=session.execute(text("SELECT email as value,concat(First_name,' ',Last_name) as label FROM PatientsInf"))
            result=session.execute(text
                ("SELECT states,P_email as email,priority,count(*)as numbers  FROM Reminder as R where D_email='{}' and states='Not competed'  group by P_email,priority order by P_email,priority,numbers desc"
                    .format(email)))
        except:
            result=False
            session.rollback()
            raise
            return False
        else:
            session.commit()
            sendback={}
            # sendback['content']=[]
            for row in pair:
                row=dict(row)
                sendback[row['value']]=dict()
                sendback[row['value']]['name']=row['label']
                sendback[row['value']]['Hcount']=0
                sendback[row['value']]['Mcount']=0
                sendback[row['value']]['Lcount']=0
            for row in result:
                row=dict(row)
                print("row",row)
                if row['priority']==1:
                    sendback[row['email']]['Hcount']=row['numbers']
                elif row['priority']==2:
                    sendback[row['email']]['Mcount']=row['numbers']
                elif row['priority']==3:
                    sendback[row['email']]['Lcount']=row['numbers']
            print(sendback)
            final={}
            final['data']=[]
            flag=1
            for i in sendback.items():
                temp={}
                print("i:",i)
                temp['key']=flag
                temp['email']=i[0]
                temp['name']=i[1]['name']
                temp['Hcount']=i[1]['Hcount']
                temp['Mcount']=i[1]['Mcount']
                temp['Lcount']=i[1]['Lcount']
                final['data'].append(temp)
                flag+=1
            print("final:",final)
            return final
    #     print ("********",result)


##################################
##get data for ReminderList of certaion patient
##################################
@app.get("/patient_count/Demail={demail}&Pemail={pemail}")
async def reminder_count(demail,pemail):
    print("get json:",demail,pemail)

    with Session(engine) as session:
        session.begin()
        try:
            sevendays=session.execute(text("select date(NOW())as d00,date(NOW()- INTERVAL 1 DAY)as d01,date(NOW()- INTERVAL 2 DAY)as d02,date(NOW()- INTERVAL 3 DAY)as d03,date(NOW()- INTERVAL 4 DAY)as d04,date(NOW()- INTERVAL 5 DAY)as d05,date(NOW()- INTERVAL 6 DAY)as d06"))
            #pair=session.execute(text("SELECT email as value,concat(First_name,' ',Last_name) as label FROM PatientsInf"))
            result=session.execute(text
                ("select date(creat_time ) as day_7 ,count(*) as numbers FROM Reminder as R where creat_time >= DATE(NOW()) - INTERVAL 7 DAY and D_email='{}' and P_email ='{}' and states='Not competed' group by date(creat_time ) "
                    .format(demail,pemail)))
        except:
            result=False
            session.rollback()
            raise
            return False
        else:
            session.commit()
            sendback={}
            sendback['content']=[]

            # days= dict(sevendays[0])
            # print(days)
            for j in sevendays:
                print("seven:",dict(j))
                j=dict(j)
                for i in j.items():
                    print("i",i)
                    temp=dict()
                    temp['day']=i[1]
                    temp['number']=0
                    sendback['content'].append(temp)
            print(sendback['content'])

            # temp=dict()
            # for i in days.items():
            #     print("i:",i)
            #     temp=dict()
            #     temp['day']=i[1]
            #     temp['number']=0
            #     sendback['content'].append(temp)
            

            for row in result:
                row=dict(row)
                for i in sendback['content']:
                    if row['day_7']==i['day']:
                        i['number']=row['numbers']
                print("row",row)
            #sendback['content'].append(temp)
            print(sendback)
            return sendback
    







@app.get("/items/{item_id}")
async def read_item(item_id):
    return {"item_id": item_id}