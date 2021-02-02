import React, { memo, useState } from 'react';
import { CourseUrlInput } from '../../components';
import { video } from '../../untils';
import * as S from './styles';
import schoolSVG from '../../assets/img/urlTeaching.svg';
import studyImage from '../../assets/img/urlStudy.svg';
import * as version from '../../config/version';

const electron = window.require('electron');
const session = electron.remote.session;

const UrlScreen = memo((props) => {
  const [error, setError] = useState('');
  const [username, setUsername] = useState(
    '9y204vxicbragl3sum7hzfeo@kocovi.cz'
  );
  const [password, setPassword] = useState('@PTnjTMM*Vq5dSLQ');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimation, setIsAnimation] = useState(false);

  const { url, setUrl } = props;

  const resetAnimation = () => {
    setIsLoading(false);
    setIsAnimation(false);
  };

  const resetError = () => {
    setError('');
    setIsError(false);
  };

  const handleUrl = () => {
    resetAnimation();
    resetError();
    setIsAnimation(true);
    setTimeout(() => setIsLoading(true), 1000);
    setTimeout(async () => {
      try {
        let data;
        if (username && password) {
          data = await video.getVIPVideos(
            url,
            username,
            password,
            session.defaultSession.cookies
          );
        } else {
          data = await video.getVideos(url);
        }
        props.setData(data);
        props.history.push('/download');
      } catch (err) {
        setError(err.message);
        setIsError(true);
        resetAnimation();
      }
    }, 1900);
  };

  return (
    <S.Container>
      <S.Title>CouseHunters Video Downloader</S.Title>
      <CourseUrlInput
        handleUrl={handleUrl}
        isError={isError}
        isLoading={isLoading}
        isAnimation={isAnimation}
        setUrl={setUrl}
        url={url}
      />
      <S.Row>
        <span
          style={{ width: '100%', textAlign: 'center', marginBottom: '1rem' }}
        >
          For VIP courses
        </span>
        <S.FormInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={'Email'}
        />
        <S.FormInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={'Password'}
          type={'password'}
        />
      </S.Row>
      {isError && <S.ErrorMessage>{error}</S.ErrorMessage>}
      <S.SchoolImage src={schoolSVG} />
      <S.StudyImage src={studyImage} />
      <S.Footer>version: {version.version}</S.Footer>
    </S.Container>
  );
});

export default UrlScreen;
