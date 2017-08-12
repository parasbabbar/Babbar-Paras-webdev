var mongoose = require("mongoose");
var SearchSchema = require("./search.schema.server");
var Question= mongoose.model("ProjectSearch", SearchSchema);

module.exports = Question;

        Question.createQuestion = createQuestion;
    Question.deleteQuestion = deleteQuestion;
    Question.updateQuestion = updateQuestion;
    Question.findQuestionByStackID = findQuestionByStackID;
    Question.findQuestionsByUser = findQuestionsByUser;
    Question.findQuestionByID = findQuestionByID;
    Question.findQuestionByText = findQuestionByText;
    Question.findAllUncheckedQuestions = findAllUncheckedQuestions;
    Question.searchQuestionByUserID = searchQuestionByUserID;



    function searchQuestionByUserID(uid){
        return Question.find({"posted_by": uid}).sort('-dateCreated');
    }

    function findAllUncheckedQuestions(){
        return Question.find({"is_checked": false}).sort('-dateCreated');
    }

    function findQuestionByText(searchtext){
        return Question.find({"body":{ "$regex": searchtext, "$options": "i"}}).sort('-dateCreated');
    }

    function findQuestionByStackID(id){
        return Question.findOne({"stackoverflow.id": id});
    }

    function findQuestionsByUser(uid){
        return Question.find({posted_by: uid});
    }

    function findQuestionByID(qid){
        return Question.findOne({ _id: qid});
    }

    function createQuestion(question){
        return Question.create(question);
    }

    function deleteQuestion(qid){
        return Question.remove({_id: qid});
    }

    function updateQuestion(qid , newquestion){
        delete newquestion._id;

        return Question
            .update({_id: qid},{
                $set: newquestion
            });

}
