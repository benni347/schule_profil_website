use reqwest;
use reqwest::Error;
use std::fmt;

fn main() {
    let questions = getQuestion(10);
}

async fn getQuestion(amountOfQuestions: i64) -> Result<(), Error> {
    // chaining .await will yield our query result
    let url = std::fmt::format("https://opentdb.com/api.php?amount={}&difficulty=hard", amountOfQuestions);
    let response = reqwest::get(url).await?;
    let body = response.text().await?;
    println!("{}", body);
    Ok(())
}
