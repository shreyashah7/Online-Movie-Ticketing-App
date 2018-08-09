import React, { Component} from 'react';
import './pricefilter.css';

class Price_Filter extends Component {
        render(){
            return <div className="price-filterrrrr">
                <span id="pricefilterSPAN_6">$</span>
                <input type="number" maxLength="9" id="pricefilterINPUT_7" placeholder="Min" name="low-price" min={0}/>
                <span id="pricefilterSPAN_8">$</span>
                <input type="number" maxLength="9" id="pricefilterINPUT_9" placeholder="Max" name="high-price" min={0}/>
                <span id="pricefilterSPAN_10">
                    <span id="pricefilterSPAN_11" onClick={()=>this.props.onGo(document.getElementById("pricefilterINPUT_7").value,document.getElementById("pricefilterINPUT_9").value)}>
                        <input type="submit" value="Go" id="pricefilterINPUT_12"/>
                        <span id="pricefilterSPAN_13">Go</span>
                    </span>

                </span>
                <span id="pricefilterSPAN_102" onClick={()=>this.props.onGo(null,null)}>
                    <span id="pricefilterSPAN_112">
                            <input type="submit" value="Clear" id="pricefilterINPUT_122"/>
                            <span id="pricefilterSPAN_132">Clear</span>
                    </span>
                </span>
                </div>
        }
}

export default Price_Filter;