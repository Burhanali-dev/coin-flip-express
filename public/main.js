

function createE(value) {
    fetch('create', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'result': value
      })
    }).then(response => {
      if (response.ok) console.log('coinflip updated')
      window.location.reload()
      
    })
}
function deleteE() {
  fetch('delete', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
  }).then(response => {
    if (response.ok) console.log('coinflip updated')
    window.location.reload()
    
  })
}



