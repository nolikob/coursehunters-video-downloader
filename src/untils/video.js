import validator from 'validator';
import axios from 'axios';
import cheerio from 'cheerio';
import _ from 'lodash';

export const getVIPVideos = async (courseUrl, username, password, cookies) => {
  if (validator.isURL(courseUrl)) {
    try {
      await getToken(username, password);
      const storedCookies = await cookies.get({});
      const data = await getVIPCourseNamesAndURLS(courseUrl, storedCookies);
      return data;
    } catch (err) {
      throw err;
    }
  } else {
    throw new Error('Course url is not valid');
  }
};

export const getVideos = async (courseUrl) => {
  if (validator.isURL(courseUrl)) {
    try {
      const data = await getCourseNamesAndURLS(courseUrl);
      return data;
    } catch (err) {
      throw err;
    }
  } else {
    throw new Error('Course url is not valid');
  }
};

const getCourseNamesAndURLS = async (courseUrl) => {
  try {
    const data = await axios.get(courseUrl).then;
    console.log(data);
    let lessonNames = [];
    let $ = cheerio.load(data.data);

    const courseName = $('.hero-description')[0].children[0].data;

    const html = $('script');
    // console.log(html)
    let dataArray = html.children('.lessons-item').children().toArray();

    const filterNames = dataArray.filter(
      (el) => el.attribs.class === 'lessons-name'
    );

    filterNames.forEach((el, idx) => {
      const videoName = el.children[0].data.replace(/[/:*?"<>|]/g, '');
      const videoNumber = idx + 1;
      lessonNames.push(`${videoNumber}. ${videoName}`);
    });

    const filterLessonUrls = dataArray.filter(
      (el) => el.name === 'link' && el.attribs.itemprop === 'contentUrl'
    );

    // format video download information
    const lessons = {};
    filterLessonUrls.forEach((flu, index) => {
      lessons[lessonNames[index]] = {
        name: lessonNames[index],
        url: flu.attribs.href,
        checked: true,
        progress: 'active',
        isFinished: false,
        status: {
          transferred: 0,
          total: 0,
          speed: 0,
          percentage: 0,
          remaining: 0,
        },
      };
    });

    if (_.isEmpty(lessons)) {
      throw new Error('Course url is not valid or videos are VIP only');
    }

    return { lessons, courseName };
  } catch (err) {
    throw err;
  }
};

async function getToken(e_mail, password) {
  await axios
    .put(
      'https://coursehunter.net/api/auth/login',
      JSON.stringify({ e_mail: e_mail, password: password }),
      {
        withCredentials: true,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
    .catch((err) => {
      throw new Error(err);
    });
  return true;
}

// {
//   headers: {
//     Cookie: cookies
//   }
// }
// https://coursehunter.net/course/platforma-api-chast-3-nastraivaemye-resursy
const getVIPCourseNamesAndURLS = async (courseUrl, cookies) => {
  try {
    console.log('Getting course');
    console.log(cookies);
    const data = await axios.get(courseUrl, { withCredentials: true });
    let lessonNames = [];
    let $ = cheerio.load(data.data);

    const courseName = $('.hero-description')[0].children[0].data;

    const html = $('#oframeplayer');
    console.log(html);
    let dataArray = html.children('.lessons-item').children().toArray();

    const filterNames = dataArray.filter(
      (el) => el.attribs.class === 'lessons-name'
    );

    filterNames.forEach((el, idx) => {
      const videoName = el.children[0].data.replace(/[/:*?"<>|]/g, '');
      const videoNumber = idx + 1;
      lessonNames.push(`${videoNumber}. ${videoName}`);
    });

    const filterLessonUrls = dataArray.filter(
      (el) => el.name === 'link' && el.attribs.itemprop === 'contentUrl'
    );

    // format video download information
    const lessons = {};
    filterLessonUrls.forEach((flu, index) => {
      lessons[lessonNames[index]] = {
        name: lessonNames[index],
        url: flu.attribs.href,
        checked: true,
        progress: 'active',
        isFinished: false,
        status: {
          transferred: 0,
          total: 0,
          speed: 0,
          percentage: 0,
          remaining: 0,
        },
      };
    });

    if (_.isEmpty(lessons)) {
      throw new Error('There was an error while downloading course');
    }

    return { lessons, courseName };
  } catch (err) {
    throw err;
  }
};
