(function (app) {
	
	app.directive('mdEditor', function () {
		
		return {
			restrict: 'E',
			transclude: true,
			templateUrl: 'app/common/directives/templates/mdeditor.html',
			scope: {
				md: "="	
			},
			controller: ['$scope', '$timeout', '$element', function ($scope, $timeout, $element) {
				var txtArea = $element[0].querySelectorAll('textarea')[0];

				if (! $scope.md) {
					$scope.md = "";	
				}
				
				var setSelectionRange = function (input, selectionStart, selectionEnd) {
					$timeout(function () {
						if (input.setSelectionRange) {
							input.focus();
							input.setSelectionRange(selectionStart, selectionEnd);
						} else if (input.createTextRange) {
							var range = input.createTextRange();
							range.collapse(true);
							range.moveEnd('character', selectionEnd);
							range.moveStart('character', selectionStart);
							range.select();
						}
					}, 1);
				};
				
				var getLineValue = function (element) {
					var result = element.value.substring(0, element.selectionStart).split('\n');
					return result[result.length - 1];
				};
				
				var insertAtCursor = function (element, value, cursorPos) {
					// todo: support IE
					var startPos = element.selectionStart;
					var endPos = element.selectionEnd;
					
					$scope.md = element.value.substring(0, startPos) + value + element.value.substring(endPos, element.value.length);
					
					if (typeof cursorPos === 'number') {
						setSelectionRange(element, startPos + cursorPos, startPos + cursorPos);
					}
				};
				
				var getSelectedText = function (element) {
					// Todo: support IE
					var startPos = element.selectionStart;
					var endPos = element.selectionEnd;
					
					return {
						startPos: startPos,
						endPos: endPos,
						value: element.value.substring(startPos, endPos)
					};
				};
				
				var eventMap = {
					'9': function (e) {
						
						insertAtCursor(txtArea, '\t', 1);
						
						e.preventDefault();
					},
					'13': function (e) {
						
						// Get line value
						var val = getLineValue(txtArea).trim();
						
						if (val.substring(0, 1) === '-') {
							insertAtCursor(txtArea, '\n- ', 3);
						}
						
					}
				};
				
				function decorateValue(value, pre, app) {
					if (!pre) {
						pre = "";	
					}

					if (!app) {
						app = "";	
					}
					
					return pre + value.trim() + app;	
				}
				
				$scope.onKeydown = function (e) {				
					if (eventMap[e.which]) {
						eventMap[e.which](e);	
					}
				};
				
				this.addStyling = function (item) {
					if (! item.prepend) {
						item.prepend = "";	
					}
					
					if (! item.append) {
						item.append = "";	
					}
					
					if (!(item.whitespace && item.whitespace == "false")) {
						item.append += " ";
					}
					
					// Get position and styling
					var result = getSelectedText(txtArea);

					// Reset selection
					setSelectionRange(txtArea, result.startPos, result.endPos);

					// Get text
					var newText = decorateValue(result.value, item.prepend, item.append, item.whitespace);
					var cursorPos = item.cursor == "center" ? newText.length - item.append.length : newText.length;
						
						
					// Swap it
					insertAtCursor(txtArea, newText, cursorPos);
				};
				
			}],
			link: function (scope, el, attrs) {
				
			}
		};
	});
	
	app.directive('mdItem', function () {
		
		return {
			
			restrict: 'E',
			require: '^mdEditor',
			template: '<button ng-click="applyStyling(type)" class="btn btn-default"><span ng-class="glyphType" class="glyphicon"></span></button>',
			scope: {
				type: "@",
				prepend: "@",
				append: "@",
				whitespace: "@",
				cursor: "@"
			},
			link: function (scope, el, attrs, mdEditor) {
				scope.glyphType = "glyphicon-" + scope.type;
				
				scope.applyStyling = function () {
					mdEditor.addStyling({
						type: scope.type,
						prepend: scope.prepend,
						append: scope.append,
						whitespace: scope.whitespace,
						cursor: scope.cursor || "after"
					});
				};
			}
			
		};
		
	});
	
}(angular.module('app.common')));