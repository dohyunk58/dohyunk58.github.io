--- 
title : "[혼공학습단] 혼공자 6주차 회고 - 자바의 예외 처리와 주요 패키지"
excerpt : "자바의 예외와 주요 패키지에 대해 학습했습니다."
date: '2025-02-23'
author: 김도현
categories : Java
tags: java 혼공학습단
---

이번 포스트는 혼공자의 마지막주차이다. 6주차에서는 10장 예외와 11장 자바 주요 클래스에 대해서 학습한다. 혼공자에 대해서는 회고록을 작성할 예정이다. 아래는 10장과 11장에 대한 정리이다.

# 10장 예외 처리

# 01 예외 클래스

**에러와 예외**

에러 : 하드웨어 오동작/고장으로 인한 오류, 발생 시 프로그램 종료

예외 : 에러 이외의 `프로그램으로 인한 오류`, 사용자의 오조작이나 개발자의 잘못된 코딩으로 발생, 예외 처리를 통해 `실행을 유지할 수 있음`

추가로, 자바는 예외가 발생할 가능성이 높은 코드에 예외 처리가 되어 있지 않으면 컴파일이 되지 않는다. 

## 예외와 예외 클래스

**예외 클래스**

자바는 예외를 클래스로 관리한다. 또한 모든 예외는 `java.lang.Exception` 클래스를 상속받는다.

프로그램 실행 시 예외가 발생하면 JVM이 예외 클래스를 객체로 생성한다. 

**예외 종류**

1. 일반 예외
    
    `컴파일러 체크 예외`; 컴파일 과정에서 예외 처리 코드가 없으면 컴파일 오류가 발생한다.
    
    RuntimeExeption 클래스의 하위 클래스가 아니다.
    
2. 실행 예외
    
    `컴파일러 넌 체크 예외`; 실행 시 예측할 수 없으므로 예외 처리 코드가 없어도 실행된다.
    
    RuntimeExeption 클래스의 하위 클래스이다.
    

## 실행 예외

실행 예외에 대해서는 개발자가 스스로 예외 처리 코드를 작성해야 한다. `실행 예외는 경험적으로 처리`하므로 아래의 내용을 인지하고 코드 작성 시 사용해야 한다.

**1. NullPointerExeption**

`java.lang.NullPointerException`  실행 예외는 객체 참조가 없는, null값을 가진 참조 변수로 객체 접근 연산자(`.`) 접근했을 때 발생한다.

```java
String data = null; // String 객체를 참조하지 않는 data 변수
System.out.println(data.toString()); // NullPointerExeption 실행 예외 발생
```

**2. ArrayIndexOutOfBoundsException**

배열 인덱스 범위 초과시 발생한다.

배열의 길이를 먼저 조사하여, 길이가 부족한 경우 조건문으로 알리거나 코드를 수정한다.

**3. NumberFormatException**

문자열을 숫자로 변환할 때 Wrapper 클래스(Integer, Double 등)와 그의 메소드(`parseXXX()`)를 사용하는데, 숫자로 변환할 수 없는 문자가 포함되어 있을 때 NumberFormatException가 발생한다.

```java
String data = "a100";
int value = Integer.parseInt(data); // **NumberFormatException** 예외 발생
```

**4. ClassCastException**

클래스의 타입 변환(Casting)이 일어날 수 있는 관계

1. 상위 ↔ 하위 클래스
2. 구현 클래스 ↔ 인터페이스

위 두 관계가 아닌 상태에서 클래스 타입 변환을 실행하면 ClassCastException 실행 에러가 발생한다.

```java
// Dog 클래스와 Cat 클래스가 Animal 추상 클래스를 상속받는다면

// 1. 정상 타입 변환
// Dog 객체를 Animal 타입의 변수에 할당함(다형성 제공)
Animal animal = new Dog(); 
// 부모 타입의 변수를 자식 타입으로 강제 변환
Dog dog = (Dog) animal;

// 2. ClassCastException 에러 발생
Animal animal = new Dog();
Cat cat = (Dog) animal; // Dog형은 Cat형과 관계 없음
```

```java
// RemoteControl 인터페이스에 대해 Televion과 Audio가 구현 클래스라면

// 1. 정상 타입 변환
RemoteControl rc = new Television();
Television tv = (Television) rc;

// ClassCastException 에러 발생
RemoteControl rc = new Television();
Audio audio = (Television) rc;
```

ClassCastException을 예방하기 위해서, 타입 변환 전에 해당 객체가 원하는 클래스의 타입인지 `instanceof`로 확인해야 한다.

```java
Animal animal = new Dog(); 
if(animal instanceof Dog) { // animal이 Dog타입인 경우
    Dog dog = (Dog) animal;
} else if(animal instanceof Cat) {
    Cat cat = (Cat) animal;
}
```

# 02 예외 처리

## 예외 처리 코드

try-catch-finally 블록으로 예외 처리한다.

```java
try {
    // 예외 발생 가능 코드
} catch (예외클래스 e) {
    // 예외 처리
} finally {
    // 항상 실행하는 코드
}
```

- try 블록에는 예외 발생 코드를 넣는다.
- try 블록에서 예외가 발생하면 catch의 블록으로 즉시 이동한다.
- finally 블록은 생략 가능하며, try나 catch에 return이 있더라도 finally 블록은 항상 실행된다.

## 예외 종류에 따른 처리 코드

**다중 catch**

여러 개의 예외 별로 예외 처리 코드를 다르게 하기 위해 catch 블록을 여러 개로 작성한다. catch 블록은 여러 개가 있어도 발생한 에러에 대해서 단 하나의 블록만 실행된다.

```java
try{
    ~~
} catch(ArrayIndexOutOfBoundsExecption e) {
    ~~
} catch(NumberFormtExeption e) {
    ~~
}
```

**catch 순서**

다중 catch 블록을 사용할 때, `상위 예외 클래스가 하위 예외 클래스 아래쪽에 위치`해야 한다. 에러가 발생하면 catch 블록 순서대로 검색하는데, 상위 예외가 먼저 있다면 그 예외 처리 코드가 실행되기 때문이다.

## 예외 떠넘기기

예외를 메소드 내부에서 try-catch로 처리할 수 있지만, 메소드를 호출한 곳에서 예외를 처리할 수도 있다.

메소드를 선언한 곳에서 예외를 처리하도록 하려면 `throws`키워드를 사용한다. throws 뒤에는 떠넘길 예외 클래스를 나열한다. 물론 모든 예외의 상위 클래스인 `Exception` 클래스를 throws하는 것만으로 모든 예외를 떠넘길 수 있다.

```java
// 쉼표로 여러 예외 클래스를 떠넘길 수 있다.
리턴타입 메소드이름(매개변수) throws 예외클래스1, 예외클래스2 {
}

// 모든 예외를 떠넘기기
리턴타입 메소드이름(매개변수) throws Exception {
}
```

throws 키워드가 붙은 메소드는 예외 처리를 위해 `반드시 try 블록 안에서 호출`되어야 한다. 

# 11장 기본 API 클래스

# 01 java.lang 패키지

java.lang 패키지에는 String과 System같은 기본적인 클래스와 인터페이스를 갖고 있으며 import 없이 사용할 수 있다.

책에 나온 java.lang 패키지를 모두 외울 수는 없다. 다만, 책에서도 사용하는 패키지의 공식 도큐먼트를 살펴보고 기능을 학습하기를 권장하고 있다.

## 자바 API 도큐먼트

**API** : 라이브러리라고 부르기도 하며, 개발에 사용되는 클래스와 인터페이스 모음이다.

https://docs.oracle.com/en/java/javase/index.html

위 사이트에서 JDK 버전별 API를 찾아볼 수 있다. 책에서 설명하는 도큐먼트 읽는 법은 생략하고, 몇가지 주요 클래스에 대해 작성해두겠다.

## Object 클래스

사용자가 선언하는 모든 클래스는 java.lang.Object 클래스를 상속한다.

**객체 해시코드 hashCode()**

객체 해시코드: 객체를 식별하는 정수값으로 객체마다 다른 값을 가진다.

✨객체의 동등 비교를 할 때는 equals() 메소드 뿐만아니라 hashCode() 메소드도 재정의해서 논리적으로 동등한 객체인지 확인해야 한다.
<!-- {: .notice} -->

**객체 문자 정보 toString()**

객체 문자 정보: 객체를 문자열로 표현한 값, `클래스이름@16진수해시코드` 정보를 리턴함, 보통은 의미 없으므로 재정의한다고 한다.

## System 클래스

java.lang.System 클래스를 통해 시스템에 접근할 수 있다.

**프로그램 종료 exit()**

JVM을 강제로 종료할 수 있다. 정상 종료일 경우 0을 매개값을 넣는다.

## Class 클래스

클래스와 인터페이스의 메타데이터(이름, 생성자/필드/메소드 정보)를 관리한다.

**Class 객체 얻기 getClass(), forName()**

Class 객체를 얻는 방법에는 3가지가 있다.

```java
// 클래스로부터 얻기
Class clazz = 클래스이름.class
Class class = Class.forName("패키지.클래스이름")
// 객체로부터 얻기 = 객체 생성이 필요함
Class clazz = 참조변수.getClass();
```

## String 클래스

자바의 문자열은 String 클래스의 인스턴스로 관리된다.

**String 메소드**

| 메소드 이름 | 설명 | 비고 |
| --- | --- | --- |
| charAt(int index) | 특정 위치 문자 반환 |  |
| equals(Object object) | 두 문자열 비교 | 문자열 리터럴이 동일한 경우 같은 String 객체를 참조한다.
new 연산자로 생성한 것과는 다를 수 있다. |
| getBytes() | byte[] 반환 |  |
| getBytes(Charset charset) | 주어진 문자셋으로 인코딩한 byte[] 반환 |  |
| indexOf(String str) | 문자열 내에서 주어진 문자열의 위치 반환 | -1은 없다는 뜻 |
| length() |  |  |
| replace(CharSequence target,
CharSequence replacement) | target 부분을 replacement로 바꾼 문자열 반환 |  |
| substring(int beginIndex) | beginIndex 위치에서 끝까지 잘라낸 새로운 문자열을 리턴함 |  |
| toUpperCase(), toLowerCase() |  |  |
| trim() | 앞 뒤 공백 제거 후 새로운 문자열 반환 |  |
| valueOf() | 기본 타입 값을 문자열로 변경 | Wrapper.parseXXX 와는 정반대 역할 |

## Wrapper 클래스

기본 타입 값을 갖는 객체를 wrapper 객체라고 한다. wrapper 객체는 외부에서 값을 변경할 수 없으며, 새 객체를 생성해 값을 변경해야 한다. 포장 객체의 클래스는 기본 타입 이름에서 대문자로 변경한 이름이다.

![image.png](image.png)

### 박싱과 언박싱

박싱: 기본 타입 값 → wrapper 객체

언박싱: wrapper 객체 → 기본 타입 값

**자동 박싱과 언박싱**

자동 박싱은 wrapper 클래스 타입에 기본값이 대입될 경우 발생한다.

```java
Integer obj = 100; // 자동 박싱
```

자동 언박싱은 기본 타입에 wrapper 객체가 대입/연산되는 경우 발생한다.

```java
Integer obj = new Integer(200);
int value1 = obj; // 자동 언박싱
int value2 = obj + 100;
```

### 문자열 기본 타입 변환

앞서 설명한 parseXXX()을 통해 문자열을 기본 타입 값으로 바꿀 수 있다.

| 메소드 | 설명 |
| --- | --- |
| `Integer.parseInt(String s)` | 문자열을 정수로 변환 |
| `Double.parseDouble(String s)` | 문자열을 실수로 변환 |
| `Boolean.parseBoolean(String s)` | 문자열을 불리언으로 변환 |
| `Long.parseLong(String s)` | 문자열을 긴 정수로 변환 |
| `Float.parseFloat(String s)` | 문자열을 부동 소수점 수로 변환 |
| `Short.parseShort(String s)` | 문자열을 짧은 정수로 변환 |
| `Byte.parseByte(String s)` | 문자열을 바이트로 변환 |

**포장 값 비교**

wrapper 객체의 값을 비교할 때 != 나 == 를 사용하면 객체를 비교할 수 있으므로 지양해야 한다. 대신 값을 언박싱 해서 비교해야 한다. (혹은 equals())

## Math 클래스

수학 계산 메소드를 제공한다. 

| 메소드 |
| --- |
| abs() |
| ceil() |
| floor() |
| max(), min() |
| random() |
| rint() : 가까운 정수의 실수값 |
| round() : 반올림 |

```java
double a = Math.rint(5.3); // 5.0 반환
double b = Math.rint(5.7); // 6.0 반환
```

# 02 java.util 패키지

java.util 패키지에는 자료구조, 날짜 등이 있다. 자료구조는 본 도서의 13장에서 따로 설명한다고 하니 자바의 자료구조를 사용할 계획이라면 13장을 확인해야 한다. 

## Date 클래스

날짜와 시간 정보를 저장하는 클래스이다. Date 객체 안에는 연/월/일/시간 정보가 들어있다.

```java
Date now = new Date(); // Date 객체 생성
```

Date 객체의 toString() 메소드는 날짜를 영어로 반환하므로 java.text 패키지의 `SimpleDateFormat` 클래스를 함께 사용한다.

```java
// 날짜와 시간에 대한 포맷을 설정한다.
SimpleDateFormat sdf = new SimpleDateFormat("yyyy년 MM월 dd일 hh시 mm분 ss초");
// 날짜 정보를 위 포맷에 맞게 획득한다.
String strNow = sdf.format(sdf);
```

## Calander 클래스

운영체제의 날짜와 시간을 얻을 때 사용하는 `추상 클래스`이다. 추상 클래스 이므로 new를 통한 객체 생성이 불가능하다. 대신 `getInstance()` 메소드를 사용하면 현재 시간에 대한 Calander 하위 객체를 얻을 수 있다.

```java
Calander now = Calander.getInstance(); // 현재 시간 객체 획득
```

Calander 객체에는 날짜와 시간 정보를 얻을 수 있는 get() 메소드가 있다.

```java
now.get(Calander.YEAR); // 년 반환
now.get(Calander.MONTH) + 1; // 월, 0부터 시작한다
```

YEAR, MONTH, DAY_OF_MONTH, DAY_OF_WEEK, AM_PM, HOUR, MINUTE, SECOND 의 Calander 하위 상수로 값을 얻을 수 있다.

# 숙제 01 throws 관련 문제

✨throws에 대한 설명으로 틀린 것은?
1) 생성자나 메소드의 선언 끝 부분에 사용되어 내부에서 발생된 예외를 떠넘긴다.
2) throws 뒤에는 떠넘겨야 할 예외를 쉼표(`,`)로 구분해서 기술한다.
3) 모든 예외를 떠넘기기 위해 간단하다 `throws Exception`으로 작성할 수 있다.
4) 새로운 예외를 발생시키기 위해 사용된다.
<!-- {: .notice} -->

throws는 예외 떠넘기기로, 메소드에서 발생할 수 있는 일반 예외를 메소드 선언부가 아닌 실행부에서 처리하도록 한다. 

```java
// 쉼표로 여러 예외 클래스를 떠넘길 수 있다.
리턴타입 메소드이름(매개변수) throws 예외클래스1, 예외클래스2 {
}

// 모든 예외를 떠넘기기
리턴타입 메소드이름(매개변수) throws Exception {
}
```

1번은 throws의 선언에 관한 질문으로로 맞는 설명이다.

2번은 예외 클래스를 여러 개 떠넘기는 방법을 묻는 것으로, 맞는 설명이다.

3번은 예외 클래스의 상속 관계를 묻는 것으로, 맞는 설명이다. 모든 예외는 Exception의 하위 클래스이므로 Exception을 떠넘기면 모든 예외를 떠넘길 수 있다.

4번은 틀린 설명으로, 예외를 발생시키는 것이 아닌 예외를 떠넘기기 위해 사용하는 것이 올바른 설명이다.

따라서 `답은 4번`이다.

# 숙제 02 java.lang 주요 클래스 정리

✨ java.lang 패키지에 속하는 주요 클래스와 용도를 정리해서 포스팅하기
<!-- {: .notice}  -->

java.lang 패키지에는 String과 System같은 기본적인 클래스와 인터페이스를 갖고 있으며 import 없이 사용할 수 있다. 아래는 주요 클래스와 메소드에 대해 작성했으며 생략한 것들도 몇가지 있다.

**Object 클래스**

사용자가 선언하는 모든 클래스는 java.lang.Object 클래스를 상속한다.

| 메소드 | 기능 | 비고 |
| --- | --- | --- |
| hashCode() | 객체의 해시코드를 반환한다. | 객체의 동등 비교를 할 때는 equals() 메소드 뿐만아니라 hashCode() 메소드도 재정의해서 논리적으로 동등한 객체인지 확인해야 한다. |
| toString() | 객체 문자 정보를 반환한다. | 객체 문자 정보: 객체를 문자열로 표현한 값, 클래스이름@16진수해시코드 정보를 리턴한다. |

**System 클래스**

JVM을 사용함으로써 시스템에 접근하지 못하는 한계를 java.lang.System을 통해 극복할 수 있다.

| 메소드 | 기능 | 비고 |
| --- | --- | --- |
| exit() | 프로그램 종료 | 정상 종료일 경우 0을 매개값으로 넣는다. |
| currenTimeMillis()
nanoTime() | 현재 시간 읽기 | 밀리세컨드 단위와 나노세컨드 단위의 현재 시간을 반환한다. |

**Class 클래스**

클래스와 인터페이스의 메타데이터(이름, 생성자/필드/메소드 정보)를 관리한다.

| 메소드 | 기능 | 비고 |
| --- | --- | --- |
| getClass() | 객체로부터 클래스를 얻는다 | `Class clazz = 참조변수.getClass();` |
| forName() | 클래스 이름으로부터 클래스를 얻는다 | `Class class = Class.forName("패키지.클래스이름"` |

**String 클래스**

자바의 문자열은 String 클래스의 인스턴스로 관리된다.

| 메소드 이름 | 설명 | 비고 |
| --- | --- | --- |
| charAt(int index) | 특정 위치 문자 반환 |  |
| equals(Object object) | 두 문자열 비교 | 문자열 리터럴이 동일한 경우 같은 String 객체를 참조한다.
new 연산자로 생성한 것과는 다를 수 있다. |
| getBytes() | byte[] 반환 |  |
| getBytes(Charset charset) | 주어진 문자셋으로 인코딩한 byte[] 반환 |  |
| indexOf(String str) | 문자열 내에서 주어진 문자열의 위치 반환 | -1은 없다는 뜻 |
| length() |  |  |
| replace(CharSequence target,
CharSequence replacement) | target 부분을 replacement로 바꾼 문자열 반환 |  |
| substring(int beginIndex) | beginIndex 위치에서 끝까지 잘라낸 새로운 문자열을 리턴함 |  |
| toUpperCase(), toLowerCase() |  |  |
| trim() | 앞 뒤 공백 제거 후 새로운 문자열 반환 |  |
| valueOf() | 기본 타입 값을 문자열로 변경 | Wrapper.parseXXX 와는 정반대 역할 |

**Wrapper 클래스**

기본 타입 값을 갖는 객체를 wrapper 객체라고 한다.

박싱을 통해 기본 타입 값을 wrapper 객체에 넣거나 언박싱을 통해 wrapper 객체에서 기본 타입 값을 꺼낼 수 있다.

![image.png](image.png)

**문자열 기본 타입 변환**

문자열을 기본 타입 값으로 바꿀 수 있다.

| 메소드 | 설명 |
| --- | --- |
| `Integer.parseInt(String s)` | 문자열을 정수로 변환 |
| `Double.parseDouble(String s)` | 문자열을 실수로 변환 |
| `Boolean.parseBoolean(String s)` | 문자열을 불리언으로 변환 |
| `Long.parseLong(String s)` | 문자열을 긴 정수로 변환 |
| `Float.parseFloat(String s)` | 문자열을 부동 소수점 수로 변환 |
| `Short.parseShort(String s)` | 문자열을 짧은 정수로 변환 |
| `Byte.parseByte(String s)` | 문자열을 바이트로 변환 |

**Math 클래스**

수학 계산 메소드를 제공한다. 

| 메소드 |
| --- |
| abs() |
| ceil() |
| floor() |
| max(), min() |
| random() |
| rint() : 가까운 정수의 실수값 |
| round() : 반올림 |

```toc
```