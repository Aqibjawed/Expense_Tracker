import styled from 'styled-components'
import { OverviewComponent } from './OverviewComponent';
import { TransactionComponent } from './TransactionComponent';
import { useEffect, useState } from 'react';

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
`;

export const HomeComponent = (props)=> {
    const [transactions, updateTransaction] = useState([]);
    const [expense, updateExpense] = useState(0);
    const [income, updateIncome] = useState(0);

    const addTransaction = (payload)=>{
        const transactionArray = [...transactions]
        transactionArray.push(payload)
        updateTransaction(transactionArray)
    }
    
    useEffect(()=>{
        const storedItems = JSON.parse(localStorage.getItem('items'));
        if (storedItems) {
            updateTransaction(storedItems);
        }
    }, [])
    useEffect(()=>{
        localStorage.setItem('items', JSON.stringify(transactions));
    }, [transactions])

    const calculateBalance= ()=>{
        let exp= 0;
        let inc= 0;
        transactions.map((item)=>{
            if(item){
                item.type === "EXPENSE"? exp= exp+item.amount: inc= inc+item.amount;
            }
        })
        updateExpense(exp)
        updateIncome(inc)
    }
    useEffect(()=> {
        calculateBalance()
    }, [transactions])

    return(
        <Container>
            <OverviewComponent addTransaction={addTransaction} expense={expense} income={income}/>
            <TransactionComponent transactions={transactions} updateTransaction={updateTransaction}/>
        </Container>
    )
}