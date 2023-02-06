import { dbService } from 'myBase';
import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const SentenceList = ({ title }) => {
  const [sentencesData, setSentenceData] = useState({});
  const navigate = useNavigate();
  const transmitData = (e) => {
    const id = e.target.parentNode.parentNode.id;
    const content = e.target.parentNode.parentNode.lastChild.data;
    navigate('/addSentence', {state: {title: title, sentenceId: id, sentenceContent: content}
  });
  }

  const getSentences = async () => {
    const sentencesObj = (
      await dbService.collection('Books').doc(title).get()
    ).data().sentences;
    setSentenceData(sentencesObj);
  };

  useEffect(() => {
    getSentences();
  }, []);

  const sentencesArr = Object.entries(sentencesData);
  if(sentencesArr.length !== 0) {
    return sentencesArr.map((data) => (
        <div className="sentenceList" id={data[0]}>
          <div>
            <button onClick={transmitData}>수정</button>
            <button>삭제</button>
            </div>
          {data[1]}
        </div>
        ))
  }
};

export default SentenceList;