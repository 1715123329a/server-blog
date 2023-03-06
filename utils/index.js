module.exports = {
    createRouter: (roles) => {
        let newArr = []
        let haspNewArr = []
        roles.forEach(item => {
            if (!item.parentId) {
                let obj = {
                    _id: item._id,
                    name: item.name,
                    path: `/${item.name}`,
                    meta: {
                        id: item.id,
                        title: item.title
                    },
                    children: []
                }
                newArr.push(obj)
            } else {
                let obj = {
                    name: item.name,
                    path: `/${item.name}`,
                    meta: {
                        id: item.id,
                        title: item.title
                    },
                    parentId: item.parentId
                }
                haspNewArr.push(obj)
            }
        })
        haspNewArr.forEach(item => {
            newArr.forEach(subItem => {
                if (String(item.parentId) === String(subItem._id)) {
                    subItem.children.push(item)
                }
            })
        })

        return newArr
    }
}