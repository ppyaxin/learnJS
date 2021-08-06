var person = {
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
}
var person1 = {
    firstName:"Bill",
    lastName: "Gates",
}
var person2 = {
    firstName:"Steve",
    lastName: "Jobs",
}
//call() 调用它前面的对象 成为它后面的 参数方法
person.fullName.call(person1);  // 将返回 "Bill Gates"
//call() 可以接受参数，参数指的是前面的对象接收的参数
var person = {
    fullName: function(city, country) {
      return this.firstName + " " + this.lastName + "," + city + "," + country;
    }
  }
  var person1 = {
    firstName:"Bill",
    lastName: "Gates"
  }
  person.fullName.call(person1, "Seattle", "USA");