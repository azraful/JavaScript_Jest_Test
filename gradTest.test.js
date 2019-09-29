function createMenuData(data) //function to return expected result
{
    for(i=0; i<data.length; i++)
    {
        if(data[i].includes('/')==false) //to check if each record contains children by checking '/'. If not, we filter them
        {
            data.splice(i, 1);
        }
    }
    var members = []  //creating an empty array for the final result
    for (var i in data)  //looping through the filtered incoming dataset
    {
            var flag = false;  //flag to check if the parent already exists
            var item = data[i];  //taking each data line
            var parent = item.split('/')  //splitting the record into parent and children based on '/' delimitter 
            
            for (j in members) //loop to check if parent exist in the result members array
            {    
                if(members[j].title==parent[0]) //if the parent already exists
                {
                    flag=true; //set the flag to indicate the parent already exists

                    members[j].data.push([parent[1]].toString()) //modify the record by adding children
                }    
            }

            if(flag==false) //if the parent does not exist, means new parent
            {
                members.push({ 
                    "title": parent[0],
                    "data" : [parent[1]]        
                }) //insert the parent and the children
            }              
    }    
    return members //return the final modified json array as result
}

describe("menu Data Generator", () => {
    it("creates correct data structure ", () => {
      const data = [
        "parent1/parent1child",
        "parent1/parent1child2",
        "parent2/parent2child",
        "parent2/parent2child2",
        "parent1/parent1child3",
        "parent3",
        "parent3/parent3child1",
        "parent4"
      ];
  
      const expectedResult = [
        {
          title: "parent1",
          data: ["parent1child", "parent1child2", "parent1child3"]
        },
        { title: "parent2", data: ["parent2child", "parent2child2"] },
        { title: "parent3", data: ["parent3child1"] }
      ];
  
      const actualResult = createMenuData(data);
      expect(actualResult).toMatchObject(expectedResult);
    });
  });