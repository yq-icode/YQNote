function genearteDateSelect(obj, valid_str, start_time, end_time, time_type){
	var valid_flag = true;
    if (valid_str != "" && valid_str != null) {
        valid_flag = valid_str;
    }
    if (start_time != null && end_time != null) {
        if (obj.id == $(start_time).id) {
            if ($F(end_time) == "" || $F(end_time) == null) {
                valid_flag = true;
            }
            else {
                valid_flag = 'date <= Date.parseFormattedString($F(end_time))';
            }
        }
        else 
            if ($F(start_time) == "" || $F(start_time) == null) {
                valid_flag = true;
            }
            else {
                valid_flag = 'date >= Date.parseFormattedString($F(start_time))';
            }
    }
	var strTimeFlag = "";
	if(time_type == 'time'){
		 new CalendarDateSelect(obj, {
		 time:'mixed',
        popup: 'force',
        valid_date_check: function(date){
            return eval(valid_flag)
        },
        year_range: [(new Date()).stripTime().getFullYear() - 100, (new Date()).stripTime().getFullYear() + 10]
    });
	}else{
		new CalendarDateSelect(obj, {
        popup: 'force',
        valid_date_check: function(date){
            return eval(valid_flag)
        },
        year_range: [(new Date()).stripTime().getFullYear() - 100, (new Date()).stripTime().getFullYear() + 10]
    });
	}
}