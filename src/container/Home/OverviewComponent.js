import { useState } from 'react';
import styled from 'styled-components'

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
margin: 10px;
`;
const BalanceBox = styled.div`
width: 95%;
display: flex;
flex-direction: row;
justify-content: space-between;
font-size:1.5rem;
font-weight: bold;
`
const AddTransactionbtn = styled.button`
background: black;
color: white;
font-weight: bold;
font-size: 1.3rem;
border-radius: 5px;
padding: 0.1rem 0.4rem;
cursor: pointer;
`;

const AddTxnContainer = styled.div`
display: flex;
flex-direction: column;
border: 1px solid #e6e8e9;
align-items: center;
gap: 15px;
width: 95%;
padding: 15px 0px;
margin: 15px 0px;
& input{
    outline: none;
    padding: 8px;
    font-size: 20px;
}
`;

const RadioBox = styled.div`
display: flex;
flex-direction: row;
width: 85%;
align-items: center;

& input{
    width: unset;
    margin: 0px 10px;
}
`;

const ExpenseContainer =  styled.div`
width: 90%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
border: 1px solid #e6e8e9;
margin: 20px 0px;
padding: 10px;
border-radius: 10px;
`

const ExpenseBox = styled.div`
display: flex;
flex-direction: column;
flex-warp: wrap;
border: 1px solid #e6e8e9;
align-items: center;
width: 35%;
font-size: 16px;
padding: 10px;
border-radius: 8px;
& span{
    font-weight: bold;
    font-size: 22px;
    color: ${(props)=> (props.isincome==='1'? "green": "red")};
}
`

const AddTransactionView = (props) => {
        const [amount, setAmount] = useState()
        const [desc, setDesc] = useState()
        const [type, setType] = useState('EXPENSE')

        const addTransaction = ()=>{
            if(amount !== undefined && desc !== undefined){
                props.addTransaction({amount: Number(amount), desc, type, id: Date.now()})
                props.toggleAddTxn()
            }

        }

    return (
        <AddTxnContainer>
            <input placeholder='Amount' value={amount} type='number' onChange={(e)=>{setAmount(e.target.value)}} />
            <input placeholder='Description' value={desc} onChange={(e)=>{setDesc(e.target.value)}}/>
            <RadioBox>
                <input type='radio' id='expense' name='type' value='EXPENSE' checked={type==="EXPENSE"} onChange={(e)=>{setType(e.target.value)}}/>
                <label htmlFor='expense'>Expense</label>
                <input type='radio' id='income' name='type' value='INCOME' checked={type==="INCOME"} onChange={(e)=>{setType(e.target.value)}}/>
                <label htmlFor='income'>Income</label>
            </RadioBox>
            <AddTransactionbtn onClick={addTransaction}>Add Transaction</AddTransactionbtn>
        </AddTxnContainer>
    )
}
export const OverviewComponent = (props) => {
    const [isAddTxnVisible, toggleAddTxn] = useState(false)
    return (
        <Container>
            <BalanceBox>
                Balance: {props.income - props.expense}Rs
                <AddTransactionbtn onClick={()=>{toggleAddTxn(!isAddTxnVisible)}}>{isAddTxnVisible ? "Cancel" : "ADD"} </AddTransactionbtn>
            </BalanceBox>
            {isAddTxnVisible && <AddTransactionView toggleAddTxn={toggleAddTxn} addTransaction={props.addTransaction}/>}
            <ExpenseContainer>
                <ExpenseBox isincome='0'>
                    Expense<span>{props.expense}Rs</span>
                </ExpenseBox>
                <ExpenseBox isincome='1'>
                    Income<span>{props.income}Rs</span>
                </ExpenseBox>
            </ExpenseContainer>
        </Container>
    )
}