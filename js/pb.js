// =================================================================
// PocketBase 연결 설정
// =================================================================
const PB_URL = 'https://pagestudio.duckdns.org:8443';
const pb = new PocketBase(PB_URL);

// 파일 URL 생성 헬퍼
function pbFile(record, filename, thumb) {
  const url = PB_URL + '/api/files/' + record.collectionId + '/' + record.id + '/' + filename;
  return thumb ? url + '?thumb=' + thumb : url;
}

window.pb = pb;
window.pbFile = pbFile;
window.PB_URL = PB_URL;
