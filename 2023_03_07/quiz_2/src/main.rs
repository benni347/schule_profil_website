use anyhow;
use reqwest;
use serde::{Deserialize, Serialize};
use serde_json;

// Define a struct called Question with the following fields
// category, question, correct_answer, incorrect_answers
#[derive(Deserialize, Serialize, Debug)]
struct Question {
    category: String,
    question: String,
    correct_answer: String,
    incorrect_answers: Vec<String>,
}

#[tokio::main]
async fn main() {
    let questions = get_question(10).await.unwrap();
    // Implement the debug trait for the Question struct
    // and print the questions
    // This will print the questions in a JSON format
    // If you want to print the questions in a more readable format
    // you can use the following code:
    // println!("{:#?}", questions);
    print!("{:?}", questions);
}

async fn get_question(amount_of_questions: i64) -> Result<Vec<Question>, anyhow::Error> {
    // chaining .await will yield our query result
    // Define a url variable with the amount being formatted into the url from the amount_of_questions
    // variable
    let url = format!(
        "https://opentdb.com/api.php?amount={}&difficulty=hard",
        amount_of_questions,
    );
    let response = reqwest::get(url).await?;
    let body = response.text().await?;

    let response_json: serde_json::Value = serde_json::from_str(&body)?;
    // Get the category, question, correct_answer, and incorrect_answers from the body
    // and add them to the Question struct
    let mut questions = Vec::new();
    if let Some(results) = response_json.get("results") {
        for result in results.as_array().unwrap() {
            let category = result["category"].as_str().unwrap().to_owned();
            let question = result["question"].as_str().unwrap().to_owned();
            let correct_answer = result["correct_answer"].as_str().unwrap().to_owned();
            let mut incorrect_answers = Vec::new();
            for answer in result["incorrect_answers"].as_array().unwrap() {
                incorrect_answers.push(answer.as_str().unwrap().to_owned());
            }
            questions.push(Question {
                category,
                question,
                correct_answer,
                incorrect_answers,
            });
        }
    }
    Ok(questions)
}
