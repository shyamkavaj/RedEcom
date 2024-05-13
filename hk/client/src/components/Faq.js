import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";
import { useSelector } from "react-redux";


const styles = {
    bgColor: 'white',
    titleTextColor: "blue",
    rowTitleColor: "black",
    rowContentColor: 'grey',
    arrowColor: "#ff6c00",
    // arrowColor: "#ffba00",
};

const config = {
    animate: true,
    arrowIcon: "+",
    tabFocus: true,
    expandIcon: "+",
    collapseIcon: "-",
};

// export default function App {
// }

const Faqs = (props) => {
    // console.log("props ", props)
    const { faqs } = useSelector(state => state?.faq);
    // console.log("faqs", faqs);
    const showFaq = faqs?.filter((q) => q.title === props.faq);
    // console.log("show faq ",showFaq)
    // showFaq.forEach((f) => console.log("one faq is : ",f.ques))
    const faqData = []

    for(var i = 0;i<showFaq.length;i++)
    {
        const newObj = {
            title:showFaq[i].ques,
            content:showFaq[i].ans
        }
        faqData.push(newObj)
    }
    // console.log('faq array object ',faqData)
    const data = {
        title: "",
        
        rows:faqData
        
    };
    // console.log('faq data ',data)
    return (
        <section className="related-product-area section_gap_bottom">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 text-center">
                        <div className="section-title">
                            <h1>Help & FaQ's</h1>
                            {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore */}
                            {/* magna aliqua.</p> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10" style={{ 'font-family': "Poppins" }}>
                        {/* <div "Poppins", sans-serif> */}
                        <Faq
                            data={data}
                            styles={styles}
                            config={config}
                        />
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Faqs;