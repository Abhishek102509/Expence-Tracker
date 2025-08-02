import express from 'express';
import cors from 'cors';
import { createConnection } from 'mysql2';
import {StatusCodes} from 'http-status-codes';
import { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyToken } from './verifyToken.js';

const PORT = 9700;

const conn = createConnection({
    host:"localhost",
    user:"root",
    password:"cdac",
    database:"expense_tracker"
});
conn.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("db connected..!");
    }
});


const app = express();

app.use(cors());
app.use(express.json());

app.post("/user",async (request,response)=>{
    try {
        const data = request.body;
        const encryptedPassword = hashSync(data.password,10);
        const qry = `INSERT INTO user(name,phone,email,password) VALUES ('${data.name}','${data.phone}','${data.email}','${encryptedPassword}')`
        conn.query(qry,(error,result)=>{
            if(error){
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:'Error in registration'});
            }
            else{
                response.status(StatusCodes.OK).send({message:'User registered !'});
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:'Something went wrong'});
    }
});

app.post("/user/login",(request,response)=>{
    try {
        const data = request.body;
        const qry = `SELECT * FROM user WHERE phone = '${data.phone}'`
        conn.query(qry,(error,result)=>{
            if(error){
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:'Error in login'});
            }
            else{
                if(result.length===0){
                    response.status(StatusCodes.BAD_REQUEST).send({message:'Invalid Credentials'});
                }
                else{
                    if(compareSync(data.password,result[0].password)){
                        const token = jwt.sign({userId:result[0].id},"secret123");
                        response.status(StatusCodes.OK).send({token:token});
                    }
                    else{
                        response.status(StatusCodes.BAD_REQUEST).send({message:'Invalid Credentials'});
                    }
                }
                
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:'Something went wrong'});
    }
});

app.post("/income",verifyToken,(request,response)=>{
    try {
        const data = request.body;
        const loggedInUserId = request.userId;
        const qry = `INSERT INTO income(amount,txn_date,source,userid) VALUES(${data.amount},'${data.date}','${data.source}',${loggedInUserId})`;
        conn.query(qry,(error,result)=>{
            if(error){
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:'Problem in saving income record'}); 
            }
            else{
                response.status(StatusCodes.OK).send({message:'Income saved'});
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:'Something went wrong'});
    }
});

app.post("/expense",verifyToken,(request,response)=>{
    try {
        const data = request.body;
        const loggedInUserId = request.userId;
        const qry = `INSERT INTO expense(amount,txn_date,source,userid) VALUES(${data.amount},'${data.date}','${data.source}',${loggedInUserId})`;
        conn.query(qry,(error,result)=>{
            if(error){
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:'Problem in saving expense record'}); 
            }
            else{
                response.status(StatusCodes.OK).send({message:'Expense saved'});
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:'Something went wrong'});
    }
});


app.get("/income",verifyToken,(request,response)=>{
    try {
        const loggedInUserId = request.userId;
        const qry = `SELECT * FROM income WHERE userid=${loggedInUserId}`;
        conn.query(qry,(error,result)=>{
            if(error){
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:'Problem in fethcing records'}); 
            }
            else{
                response.status(StatusCodes.OK).send(result);
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:'Something went wrong'});
    }
});

app.get("/expense",verifyToken,(request,response)=>{
    try {
        const loggedInUserId = request.userId;
        const qry = `SELECT * FROM expense WHERE userid=${loggedInUserId}`;
        conn.query(qry,(error,result)=>{
            if(error){
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:'Problem in fethcing records'}); 
            }
            else{
                response.status(StatusCodes.OK).send(result);
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:'Something went wrong'});
    }
});

app.get("/dashboard",verifyToken,(request,response)=>{
    try {
        const loggedInUserId = request.userId;
        console.log('userid',loggedInUserId);
        const qry1 = `SELECT sum(amount) as total_expense FROM expense WHERE userid=${loggedInUserId}`;
        const qry2 = `SELECT sum(amount) as total_income FROM income WHERE userid=${loggedInUserId}`;
        let summary = {
            total_expense:0,
            total_income:0,
            available_balance:0
        }
        conn.query(qry1,(error,result1)=>{
            if(error){
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:'Problem in fethcing records'}); 
            }
            else{
                summary.total_expense=result1[0].total_expense;
                conn.query(qry2,(error,result2)=>{
                    if(error){
                        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:'Problem in fethcing records'}); 
                    }
                    else{
                        console.log(result2);
                        summary.total_income=result2[0].total_income;
                    }
                    summary.available_balance = summary.total_income - summary.total_expense;
                    response.status(StatusCodes.OK).send(summary);
                });
            }
        });
        
       
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:'Something went wrong'});
    }
});









app.put("/expense/:id", verifyToken, (request, response) => {
    try {
        const data = request.body;
        const expenseId = request.params.id;
        const loggedInUserId = request.userId;
        
        const qry = `UPDATE expense SET amount=${data.amount}, txn_date='${data.date}', source='${data.source}' 
                    WHERE id=${expenseId} AND userid=${loggedInUserId}`;
        
        conn.query(qry, (error, result) => {
            if (error) {
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Problem updating expense' });
            } else {
                if (result.affectedRows === 0) {
                    response.status(StatusCodes.NOT_FOUND).send({ message: 'Expense not found or not authorized' });
                } else {
                    response.status(StatusCodes.OK).send({ message: 'Expense updated' });
                }
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Something went wrong' });
    }
});

app.delete("/expense/:id", verifyToken, (request, response) => {
    try {
        const expenseId = request.params.id;
        const loggedInUserId = request.userId;
        
        const qry = `DELETE FROM expense WHERE id=${expenseId} AND userid=${loggedInUserId}`;
        
        conn.query(qry, (error, result) => {
            if (error) {
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Problem deleting expense' });
            } else {
                if (result.affectedRows === 0) {
                    response.status(StatusCodes.NOT_FOUND).send({ message: 'Expense not found or not authorized' });
                } else {
                    response.status(StatusCodes.OK).send({ message: 'Expense deleted' });
                }
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Something went wrong' });
    }
});






app.put("/income/:id", verifyToken, (request, response) => {
    try {
        const data = request.body;
        const incomeId = request.params.id;
        const loggedInUserId = request.userId;
        
        const qry = `UPDATE income SET amount=${data.amount}, txn_date='${data.date}', source='${data.source}' 
                    WHERE id=${incomeId} AND userid=${loggedInUserId}`;
        
        conn.query(qry, (error, result) => {
            if (error) {
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Problem updating income' });
            } else {
                if (result.affectedRows === 0) {
                    response.status(StatusCodes.NOT_FOUND).send({ message: 'Income not found or not authorized' });
                } else {
                    response.status(StatusCodes.OK).send({ message: 'Income updated' });
                }
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Something went wrong' });
    }
});

app.delete("/income/:id", verifyToken, (request, response) => {
    try {
        const incomeId = request.params.id;
        const loggedInUserId = request.userId;
        
        const qry = `DELETE FROM income WHERE id=${incomeId} AND userid=${loggedInUserId}`;
        
        conn.query(qry, (error, result) => {
            if (error) {
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Problem deleting income' });
            } else {
                if (result.affectedRows === 0) {
                    response.status(StatusCodes.NOT_FOUND).send({ message: 'Income not found or not authorized' });
                } else {
                    response.status(StatusCodes.OK).send({ message: 'Income deleted' });
                }
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Something went wrong' });
    }
});









app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
});