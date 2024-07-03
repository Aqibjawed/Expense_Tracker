import { useEffect, useState } from 'react';
import styled from 'styled-components'

const Container = styled.div`
width: 90%;
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 10px;
margin-bottom: 25px;
font-weight: bold;
font-size: 22px;
& input{
    width: 90%;
    padding: 5px 10px;
    border-radius: 12px;
    font-size: 18px;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
}
`;

const Cell = styled.div`
width: 95%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
font-size: 18px;
border: 1px solid #e6e8e9;
padding: 5px;
border-radius: 4px;
border-right: 4px solid ${(props)=>(props.isexpense? "red": "green")};
& span{
    display: flex;
    flex-direction: row;
}
`
const Deletebtn = styled.button`
background: #555555;
color: white;
border: 1px solid black;
border-radius: 4px;
margin: 0px 5px;
`

const TransactionCell = (props)=>{
    return (
        <Cell isexpense= {props.item?.type==="EXPENSE"}>
            <span>{props.item?.desc}</span>
            <span>{props.item?.amount}Rs<Deletebtn onClick={props.deleteTransaction} name={props.item?.desc}>X</Deletebtn></span>
            
        </Cell>
    )
}

export const TransactionComponent = (props)=> {
    const [filteredTxn, updateTxn] = useState(props.transactions)
    const [searchText, updateSearchText] = useState("")

    const filterData = (searchText)=> {
        if(!searchText || !searchText.trim().length){
            updateTxn(props.transactions);
            return;
        }
        let txn = [...props.transactions];
        txn = txn.filter((item)=>{
            return item.desc.toLowerCase().includes(searchText.toLowerCase().trim());
        })
        updateTxn(txn);
    }
    useEffect(()=> filterData(searchText), [props.transactions])

    const deleteTransaction = (e)=>{
        let newTransacArray = props.transactions.filter((item)=>{
            if(item.desc != e.target.name){
                return item
            }
        })
        props.updateTransaction(newTransacArray)
    }

    return(
        <Container>
            Transactions
            <input placeholder='Search' onChange={(e)=>{
                updateSearchText(e.target.value)
                filterData(e.target.value)
            }}/>
            {filteredTxn?.length 
                ? filteredTxn.map((item)=> (<TransactionCell item={item} deleteTransaction={deleteTransaction}/>)) 
                : ""
            }
        </Container>
    )
}