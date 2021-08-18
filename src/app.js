import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";
import NewsCards from "./components/NewsCards/NewsCards";
import classNames from "classnames";
import useStyles from "./styles.js";

const alanKey = "3c23221aeba679d53b1cbbae0045230c2e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    
    const classes = useStyles();
    
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if(command === "newHeadlines") {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if(command === "highlight") {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if(command === "open") {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;
                    const article = articles[parsedNumber-1];

                    if(parsedNumber > 20){
                        alanBtn().playText("Please try that again");
                    } else if(article) {

                        window.open(article.url, "_blank");
                        alanBtn().playText("Opening...");
                    }
                }
            }
        })
    }, []) 

    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://images.unsplash.com/photo-1617994452722-4145e196248b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c291bmQlMjB3YXZlc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" className={classes.alanLogo} alt="alan logo" />
            </div>
            <NewsCards articles = {newsArticles} activeArticle={activeArticle} />
        </div>
    );
}

export default App;