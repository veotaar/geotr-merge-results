import './style.css';

document.querySelector('#app').innerHTML = `
<main>
  <h1>Geoguessr Türkiye • Günlük Challenge Sonuç Birleştirici</h1>
  <div class="form">
    <form id="form" method="post">
      <div class="form-group" data-group="1">
        <label for="gun1">1. gün:</label>
        <input type="text" id="gun1" name="gun1" />
        <div class="button-group">
          <button type="button" data-type="paste">Yapıştır</button>
          <button type="button" data-type="clear">Temizle</button>
        </div>
      </div>

      <div class="form-group" data-group="2">
        <label for="gun2">2. gün:</label>
        <input type="text" id="gun2" name="gun2" />
        <div class="button-group">
          <button type="button" data-type="paste">Yapıştır</button>
          <button type="button" data-type="clear">Temizle</button>
        </div>
      </div>

      <div class="form-group" data-group="3">
        <label for="gun3">3. gün:</label>
        <input type="text" id="gun3" name="gun3" />
        <div class="button-group">
          <button type="button" data-type="paste">Yapıştır</button>
          <button type="button" data-type="clear">Temizle</button>
        </div>
      </div>

      <div class="form-group" data-group="4">
        <label for="gun4">4. gün:</label>
        <input type="text" id="gun4" name="gun4" />
        <div class="button-group">
          <button type="button" data-type="paste">Yapıştır</button>
          <button type="button" data-type="clear">Temizle</button>
        </div>
      </div>

      <div class="form-group" data-group="5">
        <label for="gun5">5. gün:</label>
        <input type="text" id="gun5" name="gun5" />
        <div class="button-group">
          <button type="button" data-type="paste">Yapıştır</button>
          <button type="button" data-type="clear">Temizle</button>
        </div>
      </div>

      <div class="form-group" data-group="6">
        <label for="gun6">6. gün:</label>
        <input type="text" id="gun6" name="gun6" />
        <div class="button-group">
          <button type="button" data-type="paste">Yapıştır</button>
          <button type="button" data-type="clear">Temizle</button>
        </div>
      </div>

      <div class="form-group" data-group="7">
        <label for="gun7">7. gün:</label>
        <input type="text" id="gun7" name="gun7" />
        <div class="button-group">
          <button type="button" data-type="paste">Yapıştır</button>
          <button type="button" data-type="clear">Temizle</button>
        </div>
      </div>

      <div class="form-group" data-group="update">
        <button type="submit" data-type="update">
          Sonuç Tablosu Oluştur
        </button>
      </div>
    </form>
  </div>
  <div class="table" id="table"></div>
</main>
`;

const form = document.querySelector('#form');
const tableDiv = document.querySelector('.table');

const mergeDataArrays = (dataArrays) => {
  const mergedArray = [];

  for (const array of dataArrays) {
    for (const obj of array) {
      const index = mergedArray.findIndex((item) => item.userId === obj.userId);

      if (index !== -1) {
        mergedArray[index].score += obj.score;
        mergedArray[index].playerName = obj.playerName;
      } else {
        mergedArray.push({ ...obj });
      }
    }
  }
  return mergedArray.sort((a, b) => b.score - a.score);
};

const tryParseJSONObject = (jsonString) => {
  try {
    const o = JSON.parse(jsonString);
    if (o && typeof o === 'object') {
      return o;
    }
  } catch (e) {}
  return false;
};

const createTable = (data, omitColumn) => {
  // Create the table element
  const table = document.createElement('table');

  // Create table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  // Add index column header
  const indexHeader = document.createElement('th');
  indexHeader.textContent = ' ';
  headerRow.appendChild(indexHeader);
  // Add other headers except the omitted column
  Object.keys(data[0]).forEach(function (key) {
    if (key !== omitColumn) {
      const th = document.createElement('th');
      th.textContent = key;
      if (key === 'playerName') th.textContent = 'Oyuncu';
      if (key === 'score') th.textContent = 'Skor';
      headerRow.appendChild(th);
    }
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement('tbody');
  data.forEach(function (item, index) {
    const row = document.createElement('tr');
    // Add index column
    const indexCell = document.createElement('td');
    indexCell.textContent = index + 1;
    row.appendChild(indexCell);
    // Add other cells except the omitted column
    Object.entries(item).forEach(function ([key, value]) {
      if (key !== omitColumn) {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
      }
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  return table;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const formObject = Object.fromEntries(formData.entries());
  const dataArray = Object.values(formObject)
    .map((result) => tryParseJSONObject(result))
    .filter((entry) => entry !== '')
    .filter((entry) => entry);

  if (!dataArray.length) return;

  const combinedResults = mergeDataArrays(dataArray);

  const table = createTable(combinedResults, 'userId');
  const title = document.createElement('h2');
  title.innerText = 'Sonuçlar';
  tableDiv.innerHTML = '';
  tableDiv.appendChild(title);
  tableDiv.appendChild(table);
};

const handlePaste = async (inputNumber) => {
  const inputField = document.querySelector(
    `[data-group="${inputNumber}"] input`
  );
  try {
    const clipboardText = await navigator.clipboard.readText();
    inputField.value = clipboardText;
    localStorage.setItem(`${inputNumber}`, inputField.value);
  } catch (err) {
    console.error('Cannot read clipboard', err);
  }
};

const handleInputChange = (e) => {
  const dataGroup = e.target.closest('[data-group]').dataset.group;
  const inputField = e.target;
  localStorage.setItem(`${dataGroup}`, inputField.value);
};

const handleClear = (inputNumber) => {
  const inputField = document.querySelector(
    `[data-group="${inputNumber}"] input`
  );
  inputField.value = '';
  localStorage.removeItem(`${inputNumber}`);
};

const handleClick = async (e) => {
  if (!(e.target instanceof HTMLButtonElement)) return;

  const buttonType = e.target.dataset.type;

  if (buttonType === 'update') return;

  const dataGroup = e.target.closest('[data-group]').dataset.group;

  if (buttonType === 'paste') {
    await handlePaste(dataGroup);
    return;
  }

  if (buttonType === 'clear') {
    handleClear(dataGroup);
  }
};

// restore values from local storage
(() => {
  for (let i = 1; i <= 7; i++) {
    const inputField = document.querySelector(`[data-group="${i}"] input`);

    const storedValue = localStorage.getItem(`${i}`);

    if (storedValue) {
      inputField.value = storedValue;
    }
  }
})();

form.addEventListener('submit', handleSubmit);
form.addEventListener('click', handleClick);
form.addEventListener('input', handleInputChange);
form.requestSubmit();
