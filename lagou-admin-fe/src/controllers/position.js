import positionTpl from '../views/position-list.html'
import oAuth from '../utils/oAuth'
import positionAddTpl from '../views/position-add.hbs'
import randomstring from 'randomstring'
import positionUpdateTpl from '../views/position-update.hbs'
import _ from 'lodash'

export const render = async (req, res, next) => {
  let result = await oAuth()
  if (result.data.isSignin) {
    let page = req.query && req.query.page || 0
    let pagesize = req.query && req.query.pagesize || 3
    let keywords=req.query && req.query.keywords||''
    
    $.ajax({
      url: '/api/position/find',
      type: 'GET',
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      data: {
        page,
        pagesize,
        keywords
      },
      success(result) {
        let list = template.render(positionTpl, {
          data: result.data.result,
          hasResult: result.data.result.length > 0,
          page,
          keywords,
          total: result.data.total,
          pagesize: 3,
          url: location.hash.split('?')[0],
          pagecount: _.range(1, Math.ceil(result.data.total / ~~pagesize) + 1)
        })
        res.render(list)
      }
    })
    bindositionListEvent(req, res)
  } else {
    res.go('/')
  }
}
export const add = (req, res, next) => {
  res.render(positionAddTpl({}))
  bindPositionAddEvent(res)
}
export const update = (req, res, next) => {
  $.ajax({
    url: '/api/position/one',
    type: 'GET',
    headers: {
      'X-Access-Token': localStorage.getItem('token')
    },
    data: {
      'id': req.params._
    },
    success: (result) => {
      if (result.ret) {
        res.render(positionUpdateTpl({
          ...result.data
        }))
      } else {
        alert(result.data)
      }
    }
  })
  bindPositionUpdateEvent(req, res)
}
function bindositionListEvent(req, res) {
  $("#router-view").off('click', '#addbtn').on('click', '#addbtn', (e) => {
    res.go('/position_add')
  })
  $('#router-view').off('click', '#deletebtn').on('click', '#deletebtn', function (e) {
    $("#condeletebtn").off('click').on('click', (e) => {
      $.ajax({
        url: '/api/position',
        type: 'DELETE',
        headers: {
          'X-Access-Token': localStorage.getItem('token')
        },
        data: {
          'id': $(this).closest('tr').attr('data-id')
        },
        success: (result) => {
          let page = req.query && req.query.page || 0
          let pagesize = req.query && req.query.pagesize || 3
          let keywords = req.query && req.query.keywords || ''
          let total = ~~$(this).closest('tr').attr('data-total')
          //最后一页删除完毕时，跳转到上一页
          page = page * pagesize === total - 1 && page > 0 ? page - 1 : page
          if (result.ret === true) {
            $('.modal-backdrop').remove()
            res.go('/position/' + randomstring.generate(7) + `?page=${page}&pagesize=${pagesize}&keywords=${keywords}`)
            // location.reload()
          } else {
            alert(result.data.message)
          }

        }
      })
    })
  })
  $('#router-view').off('click', '.updatebtn').on('click', '.updatebtn', function (e) {
    res.go('/position_update/' + $(this).closest('tr').attr('data-id'))
  })
  $("#router-view").off('click','#possearch').on('click','#possearch',function(e){
    res.go('/position/1' + `?keywords=${$('#keywords').val()}`)
  })
}
function bindPositionAddEvent(res) {
  $('#router-view').off('click', '#posback').on('click', '#posback', (e) => {
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
        if (result.ret === true) {
          res.back()
        } else {
          alert(result.data)
        }
      },
    })
  })
}
function bindPositionUpdateEvent(req, res) {
  $('#router-view').off('click', '#posback').on('click', '#posback', function (e) {
    res.back()
  })
  $('#router-view').off('click', '#possubmit').on('click', '#possubmit', function (e) {
    $('#posupdate').ajaxSubmit({
      resetForm: true,
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      data: {
        id: req.params._
      },
      success(result) {
        if (result.ret) {
          res.back()
        } else {
          alert(result.data)
        }
      }
    })
  })
}
