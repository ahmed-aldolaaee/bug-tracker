const Chart = ({type, number}) => {

    return(
        <div className="chart">
            <ul className="numbers">
                <li><span>10</span></li>
                <li><span>5</span></li>
                <li><span>0</span></li>
            </ul>
        {type === "priority" && <> 
            <ul className="bars">
                <li><div className="bar" style={{height: 25*number[0][1]}}></div><span>High</span></li>
                <li><div className="bar" style={{height: 25*number[0][2]}}></div><span>Medium</span></li>
                <li><div className="bar" style={{height: 25*number[0][3]}}></div><span>Low</span></li>
            </ul>
        </>}
        {type === "status" && <> 
            <ul className="bars">
                <li><div className="bar" style={{height: 25*number[2][0]}}></div><span>Open</span></li>
                <li><div className="bar" style={{height: 25*number[2][1]}}></div><span>In Progress</span></li>
                <li><div className="bar" style={{height: 25*number[2][2]}}></div><span>Resolved</span></li>
            </ul>
        </>}
        {type === "catagory" && <>  
            <ul className="bars barss">
                <li><div className="bar" style={{height: 25*number[1][0]}}></div><span>Functional</span></li>
                <li><div className="bar" style={{height: 25*number[1][1]}}></div><span>Performance</span></li>
                <li><div className="bar" style={{height: 25*number[1][2]}}></div><span>Usability</span></li>
                <li><div className="bar" style={{height: 25*number[1][3]}}></div><span>Compatibility</span></li>
                <li><div className="bar" style={{height: 25*number[1][4]}}></div><span>Security</span></li>
            </ul>
        </>}
        </div>
    )
}

export default Chart;