document.addEventListener('DOMContentLoaded', function(){
  // Source toggles
  document.querySelectorAll('.show-sources').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.target;
      const el = document.getElementById(id);
      if(el) el.classList.toggle('hidden');
    });
  });

  // Poll keys
  const KEY_REAL = 'poll_real';
  const KEY_MYTH = 'poll_myth';
  const VOTED = 'poll_voted';

  function getCount(key){
    return parseInt(localStorage.getItem(key) || '0', 10);
  }

  function setCount(key, n){
    localStorage.setItem(key, String(n));
  }

  function updateResultsUI(){
    const real = getCount(KEY_REAL);
    const myth = getCount(KEY_MYTH);
    const total = real + myth || 1; // avoid div by zero
    const realPct = Math.round((real/total)*100);
    const mythPct = Math.round((myth/total)*100);

    const resultText = `Results — Real: ${real} (${realPct}%), Myth: ${myth} (${mythPct}%)`;
    document.getElementById('result-text').textContent = resultText;

    const realBar = document.querySelector('.real-bar');
    const mythBar = document.querySelector('.myth-bar');
    if(realBar) realBar.style.width = realPct + '%';
    if(mythBar) mythBar.style.width = mythPct + '%';

    document.getElementById('real-count').textContent = real;
    document.getElementById('myth-count').textContent = myth;
  }

  // Init results area
  updateResultsUI();

  // Submit handler
  const form = document.getElementById('poll-form');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(localStorage.getItem(VOTED)){
      alert('You have already voted. Thank you.');
      showResults();
      return;
    }
    const choice = form.querySelector('input[name="vote"]:checked');
    if(!choice) return;
    if(choice.value === 'real') setCount(KEY_REAL, getCount(KEY_REAL)+1);
    else setCount(KEY_MYTH, getCount(KEY_MYTH)+1);
    localStorage.setItem(VOTED, '1');
    updateResultsUI();
    showResults();
  });

  // View results button
  document.getElementById('view-results').addEventListener('click', showResults);

  function showResults(){
    document.getElementById('results').classList.remove('hidden');
    updateResultsUI();
  }
});
