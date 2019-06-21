import positionTpl from '../views/position-list.hbs'
import oAuth from '../utils/oAuth'
import positionAddTpl from '../views/position-add.hbs'


export const render = async (req, res, next) => {
  let result = await oAuth()
  if (result.data.isSignin) {
    $.ajax({
      url: '/api/position',
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      success(result) {
        res.render(positionTpl({
          data: result.data,
          hasResult: result.data.length > 0
        }))
      }
    })
    bindositionListEvent(res)
  } else {
    res.go('/')
  }

}
export const add = (req, res, next) => {
  res.render(positionAddTpl({}))
  bindPositionAddEvent(res)
}
function bindositionListEvent(res) {
  $("#router-view").on('click', '#addbtn', (e) => {
    res.go('/position_add')
  })
}
function bindPositionAddEvent(res) {
  $('#posback').on('click', (e) => {
    res.back()
  })

  $('#possubmit').on('click', (e) => {
    $('#possave').ajaxSubmit({
      url: '/api/position',
      type: 'POST',
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      resetForm: true,
      success: (result) => {
        res.back()
      }
    })
    // $.ajax({
    //   url: '/api/position',
    //   type: 'POST',
    //   data: $('#possave').serialize(),
    //   headers: {
    //     'X-Access-Token': localStorage.getItem('token')
    //   },
    //   success: (result) => {
    //     res.back()
    //   }
    // })
  })
}
